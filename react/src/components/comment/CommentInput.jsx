import { useState } from 'react';
import './CommentInput.scss'
import { ReactComponent as IconSend } from '../../assets/icon/send.svg'
import axios from 'axios';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState , convertFromHTML} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { convertFromRaw } from 'draft-js';

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
const customEditor = {
        options: ['inline', 'emoji','history'],
        inline: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['bold', 'italic', 'underline'],
        //   bold: { icon: bold, className: undefined },
        //   italic: { icon: italic, className: undefined },
        //   underline: { icon: underline, className: undefined },
        //   strikethrough: { icon: strikethrough, className: undefined },
        //   monospace: { icon: monospace, className: undefined },
        //   superscript: { icon: superscript, className: undefined },
        //   subscript: { icon: subscript, className: undefined },
        },
        blockType: {
          inDropdown: true,
          options: ['Normal'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        fontSize: {
                inDropdown : true,
          icon: <IconSend/>,
          options: [8, 96],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          toolbar : false
        },
        fontFamily: {
          options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
        },
        list: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['unordered', 'ordered', 'indent', 'outdent'],
        },
        textAlign: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['left', 'center', 'right', 'justify']
        },
        colorPicker: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
            'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
            'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
            'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
            'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
            'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
        },
        link: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          dropdownClassName: undefined,
          showOpenOptionOnHover: true,
          defaultTargetOption: '_self',
          options: ['link', 'unlink'],
          linkCallback: undefined
        },
        emoji: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          emojis: [
            '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
            '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
            '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
            '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
            '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
            '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
            '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
            '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
            '✅', '❎', '💯',
          ],
        },
        embedded: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          embedCallback: undefined,
          defaultSize: {
            height: 'auto',
            width: 'auto',
          },
        },
        image: {
          className: undefined,
          component: undefined,
          popupClassName: undefined,
          urlEnabled: true,
          uploadEnabled: true,
          alignmentEnabled: true,
          uploadCallback: undefined,
          previewImage: false,
          inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
          alt: { present: false, mandatory: false },
          defaultSize: {
            height: 'auto',
            width: 'auto',
          },
        },
        history: {
          inDropdown: false,
          className: undefined,
          component: undefined,
          dropdownClassName: undefined,
          options: ['undo', 'redo'],
        },
      }
export const CommentInput = ({data,commentParent, onReply}) => {
        const [editorState, setEditorState] = useState(() => {
                if (data?.content) {
                        const contentState = ContentState.createFromBlockArray(
                          convertFromHTML(data?.content)
                        );
                        const newEditorState = EditorState.createWithContent(contentState);
                        return newEditorState
                      }
                return EditorState.createEmpty();
        });
        const handleAddComment = (e) => {
                const contentState = draftToHtml(convertToRaw(editorState.getCurrentContent()))
                console.log(contentState);
                console.log('Comment cha path', commentParent?.path);
                let id = commentParent?.id ? commentParent?.id : null;
                console.log('ID là : ', id);
                let infoComment = {
                        user_id : 1,
                        product_id : 1,
                        comment_id : id,
                        // image : 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg',
                        content : contentState,
                }
                axios({
                        method: 'post',
                        url: 'http://localhost:8000/api/comments',
                        withCredentials: true,     
                        data : infoComment   
                    })
                .then(res => {
                  console.log(res.data);
                  setEditorState(EditorState.createEmpty());
                  onReply(false);
                })
                .catch(err => console.log(err))
        }
        return <div className={`comment-input d-flex align-items-center gap-3 ${commentParent?.level + 1 >= 2 ? 'ms-5' : '' }`}>
            <div className="avatar"><img src={data?.avatar || 'https://scr.vn/wp-content/uploads/2020/07/%E1%BA%A2nh-n%E1%BB%81n-bi%E1%BB%83n-%C4%91%E1%BA%B9p-trong-xanh.jpg'} alt="Ảnh đại diện"/></div>
                    <Editor
          editorState={editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={val => setEditorState(val)}
          toolbar={customEditor}
        />
        <div className="btn-send" onClick={handleAddComment}><IconSend/></div>
    <div>

      </div>
            </div>
}