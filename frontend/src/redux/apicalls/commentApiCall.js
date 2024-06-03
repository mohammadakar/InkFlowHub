import {postActions} from "../slices/postSlice";
import request from "../../utils/request"
import {toast} from "react-toastify"
import { commentActions } from "../slices/commentSlice";


export function createComment(newComment){
    return async (dispatch,getState)=>{
        try {
            const res=await request.post("/api/comments",newComment,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.addCommentToPost(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function updateComment(commentId,newComment){
    return async (dispatch,getState)=>{
        try {
            const res=await request.put(`/api/comments/${commentId}`,newComment,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(postActions.updateCommentPost(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function deleteComment(commentId){
    return async (dispatch,getState)=>{
        try {
            await request.delete(`/api/comments/${commentId}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(commentActions.deleteComment(commentId));
            dispatch(postActions.deleteCommentFromPost(commentId));
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function getAllComments(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get("/api/comments",{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(commentActions.setComments(res.data));
            
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}
