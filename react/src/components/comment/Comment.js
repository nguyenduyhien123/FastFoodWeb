import { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import './Comment.scss'
import { ReactComponent as IconSend } from '../../assets/icon/send.svg'
import { ReactComponent as IconThreeDotHorizontal } from '../../assets/icon/threeDotHorizontal.svg'
import { CommentItem } from "./CommentItem";
import { CommentInput } from "./CommentInput";
import axios from 'axios'
import Pusher from 'pusher-js';


export default function Comment() {
    const [comment, setComment] = useState("");
    const [activeButtonAction, setActiveButtonAction] = useState(false);
    const handleReply = (commentIndex) => {
        const updatedComments = [...listComment];
        console.log('Index : ', commentIndex);
        const elementToInsert = {
            avatar: 'https://img5.thuthuatphanmem.vn/uploads/2021/07/16/hinh-anh-rung-cay-xanh-dep-man-nhan_093251383.jpg',
            name: 'Nguyễn Văn A',
            accountType: 'user',
            content: 'Xin chào 123',
            time: '10/01/2024',
            level: 2,
            isCommented: false
        };
        const indexToInsert = commentIndex;

        updatedComments.splice(indexToInsert + 1, 0, elementToInsert);
        setListComment(updatedComments);
    };
    // const [listComment, setListComment] = useState([
    //     {
    //         avatar: 'https://img5.thuthuatphanmem.vn/uploads/2021/07/16/hinh-anh-rung-cay-xanh-dep-man-nhan_093251383.jpg',
    //         name: 'Nguyễn Văn A',
    //         accountType: 'user',
    //         content: 'Xin chào',
    //         time: '10/01/2024',
    //         level: 1
    //     },
    //     {
    //         avatar: 'https://img5.thuthuatphanmem.vn/uploads/2021/07/16/hinh-anh-rung-cay-xanh-dep-man-nhan_093251383.jpg',
    //         name: 'Nguyễn Văn B',
    //         accountType: 'admin',
    //         content: 'Xin chào 123',
    //         time: '10/01/2022',
    //         level: 2
    //     },
    //     {
    //         avatar: 'https://img5.thuthuatphanmem.vn/uploads/2021/07/16/hinh-anh-rung-cay-xanh-dep-man-nhan_093251383.jpg',
    //         name: 'Nguyễn Duy C',
    //         accountType: 'admin',
    //         content: 'Sản phẩm này tốt nè',
    //         time: '12/09/2023',
    //         level: 1
    //     },
    // ])
    const [listComment, setListComment] = useState([
    ])
    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:8000/api/comments',
            withCredentials: true,
        })
            .then(res => {
                console.log(res.data)
                setListComment(res.data)
            })
            .catch(err => console.log(err))
    }, [])
    useEffect(() => {
        // Enable pusher logging - don't include this in production
        Pusher.logToConsole = true;
        var pusher = new Pusher('47d37c0d59f198cbf07c', {
            cluster: 'ap1',
            encrypted: true
        });
        const handleReceive  = () => {
            axios({
                method: 'get',
                url: 'http://localhost:8000/api/comments',
                withCredentials: true,
            })
                .then(res => {
                    console.log(res.data)
                    setListComment(res.data)
                })
                .catch(err => console.log(err))
        }
        var channel = pusher.subscribe('commentChannel');
        channel.bind('App\\Events\\NewCommentEvent', (data) => {
            console.log('Dữ liệu Event', data);
            handleReceive()
        });
        channel.bind('pusher:subscription_succeeded', (data) => {
            console.log('Dữ liệu subscription_succeeded', data);
            handleReceive()
        });
        return () => {
            channel.unbind('NewCommentEvent');
            pusher.unsubscribe('commentChannel');
            pusher.disconnect();
          };
    }, [])
    console.log(comment);
    return <div className="comment-section">
        <div className="comment-input d-flex align-items-center gap-3">
            <CommentInput />
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
