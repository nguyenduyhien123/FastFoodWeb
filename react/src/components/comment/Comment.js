import { useContext, useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import './Comment.scss'
import { ReactComponent as IconSend } from '../../assets/icon/send.svg'
import { ReactComponent as IconThreeDotHorizontal } from '../../assets/icon/threeDotHorizontal.svg'
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import axios from 'axios'
import Pusher from 'pusher-js';
import { AuthContext } from "../../context/AuthContext";


export default function Comment({product_id}) {
    const {isLogin, userInfo} = useContext(AuthContext);
    const [comment, setComment] = useState("");
    const [activeButtonAction, setActiveButtonAction] = useState(false);
    const [listComment, setListComment] = useState([
    ])
    const getCommentsByProductId = (id ) => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/summary/getCommentsByCriteria',
            withCredentials: true, 
            params: {
                product_id: id,
              }         
        })
        .then(res => {
            // console.log(res.data);
            setListComment(res.data);
        })
        .catch(err => {
        })
    }
    useEffect(() => {
        getCommentsByProductId(product_id);
    }, [])
    const handleReceive  = () => {
        getCommentsByProductId(product_id);
    }
    // console.log('Comment .....');
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
        var pusher = new Pusher('47d37c0d59f198cbf07c', {
            cluster: 'ap1',
            encrypted: true
        });

        var channel = pusher.subscribe('commentChannel');
        channel.bind('App\\Events\\NewCommentEvent', (data) => {
            // console.log('Dữ liệu Event', data);
            handleReceive()
        });
        channel.bind('pusher:subscription_succeeded', (data) => {
            // console.log('Dữ liệu subscription_succeeded', data);
            handleReceive()
        });
        return () => {
            channel.unbind('NewCommentEvent');
            pusher.unsubscribe('commentChannel');
            pusher.disconnect();
          };
    }, [])
    // console.log(comment);
    return <div className="comment-section w-100">
        <div className="comment-input d-flex align-items-center gap-3">
            {isLogin ? <CommentInput /> : <h1>Đăng nhập đi bạn</h1>}
        </div>
        <div className="list-comment mt-3">
            {listComment?.map((data, index) => {
                if (data?.isCommented === false) {
                    return <div className="mt-3"><CommentInput data={data} /></div>
                }
                return <div className="mt-3"><CommentItem data={data} /></div>
            })}
        </div>
    </div>
}
