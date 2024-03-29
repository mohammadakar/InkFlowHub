import {Link, useParams, useNavigate} from "react-router-dom"
import "./postdetails.css"
import { useEffect , useState} from "react";
import {toast} from "react-toastify"
import AddComment from "../../components/comments/addComment";
import CommentList from "../../components/comments/commentList";
import swal from "sweetalert";
import UpdatePostModal from "./UpdatePostModal";
import {useDispatch,useSelector} from "react-redux";
import { deletePost, getSinglePost,toggleLike, updatePostImage } from "../../redux/apicalls/postApiCall";

const PostDetails = () => {
    
    const dispatch=useDispatch();
    const {post} = useSelector(state => state.post)
    const {user} = useSelector(state => state.auth)

    const {id}=useParams(); 

    const [file,setFile]=useState(null)
    const [update,setUpdate]=useState(false)
    
    useEffect(()=>{
        window.scrollTo(0,0);
        dispatch(getSinglePost(id))
    },[id,dispatch]);

    // update image submit handler
    const updateImageSubmitHandler = (e)=>{
        e.preventDefault();
        if(!file) return toast.warning("there is no file")

        const formData=new FormData();
        formData.append("image" , file)
        dispatch(updatePostImage(formData,id))
    }
    
    const navigate=useNavigate();
    //delete post handler
    const deletePostHandler=()=>{
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this post",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }).then((isOk)=>{
            if(isOk){
                dispatch(deletePost(post?._id));
                navigate(`/profile/${user?._id}`)
            } 
        });
    };
        
    

    return ( 
        <section className="post-details">
            
            <div className="post-details-image-wrapper">
                <img src={file ? URL.createObjectURL(file):post?.image.url} alt="" className="post-details-image" />
                {user?._id === post?.user?._id &&(
                    <form onSubmit={updateImageSubmitHandler} className="update-post-image-form">
                    <label htmlFor="file" className="update-post-label">
                        <i className="bi bi-image-fill"></i>
                        Select new image
                    </label>
                    <input onChange={(e)=>setFile(e.target.files[0])} style={{display:"none"}} type="file" name="file" id="file" />
                    <button type="submit">upload</button>
                </form>
                )
                }
            </div>
            <h1 className="post-details-title">{post?.title}</h1>
            <div className="post-details-user-info">
                <img src={post?.user.profilePhoto?.url} alt="" className="post-details-user-image" />
                <div className="post-details-user">
                    <strong>
                        <Link to={`/profile/${post?.user._id}`}>{post?.user.username}</Link>
                    </strong>
                    <span>{new Date(post?.createdAt).toDateString()}</span>
                </div>
            </div>
            <p className="post-details-description">
                {post?.description}
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Harum quibusdam molestiae incidunt et minus, temporibus accusamus 
                totam? Laudantium cum culpa, 
                nisi dolorum animi eum alias quisquam enim placeat repellat saepe.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Harum quibusdam molestiae incidunt et minus, temporibus accusamus 
                totam? Laudantium cum culpa, 
                nisi dolorum animi eum alias quisquam enim placeat repellat saepe.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Harum quibusdam molestiae incidunt et minus, temporibus accusamus 
                totam? Laudantium cum culpa, 
                nisi dolorum animi eum alias quisquam enim placeat repellat saepe.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Harum quibusdam molestiae incidunt et minus, temporibus accusamus 
                totam? Laudantium cum culpa, 
                nisi dolorum animi eum alias quisquam enim placeat repellat saepe.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Harum quibusdam molestiae incidunt et minus, temporibus accusamus 
                totam? Laudantium cum culpa, 
                nisi dolorum animi eum alias quisquam enim placeat repellat saepe.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Harum quibusdam molestiae incidunt et minus, temporibus accusamus 
                totam? Laudantium cum culpa, 
                nisi dolorum animi eum alias quisquam enim placeat repellat saepe.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
                Harum quibusdam molestiae incidunt et minus, temporibus accusamus 
                totam? Laudantium cum culpa, 
                nisi dolorum animi eum alias quisquam enim placeat repellat saepe.
            </p>
            <div className="post-details-icon-wrapper">
                <div >
                    {user &&(
                    <i onClick={()=>dispatch(toggleLike(id))} 
                    className={post?.likes.includes(user?._id)?"bi bi-hand-thumbs-up-fill"
                    :"bi bi-hand-thumbs-up"}>
                    </i>)}
                    <small>{post?.likes.length} Likes</small>
                </div>
                {user?._id === post?.user?._id && (
                    <div>
                    <i onClick={()=>setUpdate(true)} className="bi bi-pencil-square"></i>
                    <i onClick={deletePostHandler} className="bi bi-trash-fill"></i>
                </div>
                )}
            </div>
            {user ? <AddComment postId={post?._id}/> : <p className="post-details-info-write">To write a comment please login</p>
            }
            
            <CommentList comments={post?.comments}/>
            {update && <UpdatePostModal post={post} setUpdatePost={setUpdate}/>}
        </section>
    );
}

export default PostDetails;