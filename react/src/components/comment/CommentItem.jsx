import './CommentItem.scss'
import React, { useState } from "react";
import { ReactComponent as IconThreeDotHorizontal } from '../../assets/icon/threeDotHorizontal.svg'
import moment from 'moment';
import 'moment/locale/vi'; // Import ngôn ngữ tiếng Việt hoặc ngôn ngữ khác
import TimeAgo from 'react-timeago';
import viStrings from 'react-timeago/lib/language-strings/vi';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import { CommentInput } from './CommentInput';
import DOMPurify from 'dompurify';

let strTime = 'trước'
const customViStrings = {
    ...viStrings,
    prefixAgo: null,
    prefixFromNow: null,
    suffixAgo: null,
    suffixFromNow: null,
    seconds: `%d giây ${strTime}`,
    minute: `1 phút ${strTime}`,
    minutes: `%d phút ${strTime}`,
    hour: `1 giờ ${strTime}`,
    hours: `%d giờ ${strTime}`,
    day: `1 ngày ${strTime}`,
    days: `%d ngày ${strTime}`,
    month: `1 tháng ${strTime}`,
    months: `%d tháng ${strTime}`,
    year: `1 năm ${strTime}`,
    years: `%d năm ${strTime}`,
  };
const formatter = buildFormatter(customViStrings);

export const CommentItem = ({ data }) => {
    moment.locale('vi');
    const [comment, setComment] = useState(data?.content);
    const [activeButtonAction, setActiveButtonAction] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isReply, setIsReply] = useState(false);
    return <> {!isEdit && <div className={`comment-item d-flex gap-3 level-${data.level}`}>
    <div className="avatar"><img src={data.user.avatar} alt="Ảnh đại diện" /></div>
    <div>
        <div className="d-flex gap-3">
            <div className="comment-name fw-bold">
                {data.user?.fullname}
            </div>
            <div className="account-type">{data.user?.role.name}</div>
        </div>
        {!isEdit && <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content) }} className="comment-content">
            
        </div>}

        {isEdit && <input type="email" class="form-control" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Nhập bình luận" />}
        <div className='d-flex align-items-center gap-3'>
        <div className="comment-time">{ <TimeAgo date={data.created_at} formatter={formatter} />}</div>
        {data?.level == 1 && <div className="reply" onClick={() => setIsReply(!isReply)}>Phản hồi</div>}
        </div>
    </div>
    <div>
        <div className="btn-action">
            <div onClick={() => setActiveButtonAction(!activeButtonAction)}><IconThreeDotHorizontal /></div>
            {activeButtonAction && <div className="list-action">
                <p className="action-item">Xoá</p>
                <p className="action-item" onClick={() => setIsEdit(!isEdit)}>Sửa</p>
            </div>}
        </div>
    </div>
</div>}
{
    isEdit && <CommentInput data={data}/>
}
{
    isEdit && <p onClick={() => setIsEdit(false)} style={{ color : "#0866FF" }}>Nhấn vào đây để huỷ bình luận 123</p>
}
{
    isReply && <CommentInput commentParent={data} onReply={setIsReply}/>
}
    </>
}