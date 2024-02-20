
import AdminSidebar from "./AdminSidebar"
import "./admin-table.css"
import swal from "sweetalert";
import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react";
import { deleteComment, getAllComments } from "../../redux/apicalls/commentApiCall";
const CommentsTable = () => {
    
    const dispatch=useDispatch();
    const {comments}=useSelector(state => state.comment);

    useEffect(()=>{
        dispatch(getAllComments())
    },[])


    const deleteCommentHandler=(commentId)=>{
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this comment!",
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
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Comments</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>User</th>
                            <th>Comment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {comments.map((item,index)=>(
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className="table-image">
                                        <img src={item.user.profilePhoto?.url} 
                                        alt="" className="table-user-image" />
                                        <span className="table-username">{item.user.username}</span>
                                    </div>
                                </td>
                                <td>{item.text}</td>
                                <td className="table-button-group">
                                    <button onClick={()=>deleteCommentHandler(item._id)}>Delete comment</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CommentsTable;