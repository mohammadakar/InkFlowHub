import { useState } from "react";
import {toast} from "react-toastify"
import "./addComment.css"
import {useDispatch} from "react-redux"
import { createComment } from "../../redux/apicalls/commentApiCall";

const AddComment = ({postId}) => {
    const dispatch=useDispatch();

    const [text,setText]=useState("")

    const FormSubmitHandler=(e)=>{
        e.preventDefault();
        if(text.trim() ==="") return toast.error("Please write somthing")

        
        dispatch(createComment({text,postId}))
        setText("");
    }

    return ( 
        <form onSubmit={FormSubmitHandler} className="add-comment">
            <input type="text" placeholder="Add a comment" className="add-comment-input" value={text} onChange={(e)=>setText(e.target.value)}/>
            <button type="submit" className="add-comment-btn">Comment</button>
        </form>
    );
}

export default AddComment;