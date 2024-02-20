import { useState } from "react";
import "./commentList.css"
import swal from "sweetalert";
import UpdateCommentModal from "./updateCommentModal";
import Moment from "react-moment"
import {useSelector,useDispatch} from "react-redux";
import { deleteComment } from "../../redux/apicalls/commentApiCall";

const CommentList = ({comments}) => {

    const dispatch=useDispatch();
    
    const {user} = useSelector(state => state.auth)

    const [updateComment,setUpdateComment]=useState(false)
    const [commentForUpdate,setCommentForUpdate]=useState(null)

    const updateCommentHandler = (comment)=>{
        setCommentForUpdate(comment);
        setUpdateComment(true);
    }

    const deleteCommenttHandler=(commentId)=>{
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }).then((isOk)=>{
            if(isOk){
                dispatch(deleteComment(commentId))
            }
        });
    }

    return ( 
        <div className="comment-list">
            <h4 className="comment-list-count">{comments?.length}</h4>
            {comments?.map(comment=>(
                <div className="comment-item" key={comment._id}>
                    <div className="comment-item-info">
                    <div className="comment-item-username">
                        {comment.username}
                    </div>
                    <div className="comment-item-time">
                        <Moment fromNow ago>{comment.createdAt}</Moment>{" "}
                        ago
                    </div>
                    <p className="comment-item-text">
                        {comment.text}
                    </p>
                    {
                        user?._id === comment.user && (
                            <div className="comment-item-icon-wrapper">
                                <i onClick={()=>updateCommentHandler(comment)} className="bi bi-pencil-square"></i>
                                <i onClick={()=>deleteCommenttHandler(comment._id)} className="bi bi-trash-fill"></i>
                            </div>
                        )
                    }
                    </div>
                </div>
            ))}
            {updateComment && 
            <UpdateCommentModal commentForUpdate={commentForUpdate} setUpdateComment={setUpdateComment} />}
        </div>
    );
}

export default CommentList;