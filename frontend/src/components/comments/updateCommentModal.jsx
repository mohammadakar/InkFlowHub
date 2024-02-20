import { useState } from "react";
import "./updatecommentmodal.css"
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { updateComment } from "../../redux/apicalls/commentApiCall";
const UpdateCommentModal = ({setUpdateComment ,commentForUpdate}) => {

    const dispatch=useDispatch();

    const [text,setText]=useState(commentForUpdate.text)


    const formSubmitHandler=(e)=>{
        e.preventDefault();

        if(text.trim()==="") return toast.error("Write something")
    
        dispatch(updateComment(commentForUpdate?._id,{text}))
        setUpdateComment(false)
    }


    return ( 
        <div className="update-comment">
            <form onSubmit={formSubmitHandler} className="update-comment-form">
                <abbr title="close">
                    <i onClick={()=>setUpdateComment(prev=>!prev)} className="bi bi-x-circle-fill update-comment-form-close"></i>
                </abbr>
                <h1 className="update-comment-title">Edit Comment</h1>
                <input type="text" className="update-comment-input" value={text} onChange={(e)=>setText(e.target.value)}/>
                <button type="submit" className="update-comment-btn">
                    Edit comment
                </button>

            </form>
        </div>

    );
}

export default UpdateCommentModal;