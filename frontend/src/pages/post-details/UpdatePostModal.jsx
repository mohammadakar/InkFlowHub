import { useState,useEffect } from "react";
import "./updatepostmodal.css"
import { toast } from "react-toastify";
import {useDispatch,useSelector} from "react-redux"
import { updatePost } from "../../redux/apicalls/postApiCall";
import { fetchAllCategories } from "../../redux/apicalls/categoryApiCall";

const UpdatePostModal = ({setUpdatePost , post}) => {

    const dispatch=useDispatch();

    const {categories} =useSelector(state =>state.category)

    const [title,setTitle]=useState(post.title)
    const [category,setCategory]=useState(post.category)
    const [description,setDescription]=useState(post.description)


    const formSubmitHandler=(e)=>{
        e.preventDefault();

        if(title.trim()==="") return toast.error("title is required")
        if(category.trim()==="") return toast.error("category is required")
        if(description.trim()==="") return toast.error("description is required")
        
        dispatch(updatePost({title,category,description},post?._id));
        setUpdatePost(false);
    }

    useEffect(()=>{
        dispatch(fetchAllCategories())
    },[])



    return ( 
        <div className="update-post">
            <form onSubmit={formSubmitHandler} className="update-post-form">
                <abbr title="close">
                    <i onClick={()=>setUpdatePost(prev=>!prev)} className="bi bi-x-circle-fill update-post-form-close"></i>
                </abbr>
                <h1 className="update-post-title">Update post</h1>
                <input type="text" className="update-post-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="update-post-input">
                    <option disabled value="">Select a Category</option>
                    {categories.map(category => <option key={category._id} value={category.title}>{category.title}</option>)}
                    
                </select>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="5" className="update-post-textarea"></textarea>
                <button type="submit" className="update-post-btn">
                    Update Post
                </button>

            </form>
        </div>

    );
}

export default UpdatePostModal;