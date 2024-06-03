import { useState,useEffect } from "react";
import "./createPost.css"
import {toast} from "react-toastify"
import {useDispatch,useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import { createPost } from "../../redux/apicalls/postApiCall";
import { fetchAllCategories } from "../../redux/apicalls/categoryApiCall";
const CreatePost = () => {
    const dispatch=useDispatch();
    const {loading,isPostCreated}=useSelector(state => state.post)
    const {categories} =useSelector(state =>state.category)
    
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")
    const [category,setCategory]=useState("")
    const [file,setFile]=useState(null)

    const formSubmitHandler=(e)=>{
        e.preventDefault();

        if(title.trim()==="") return toast.error("title is required")
        if(category.trim()==="") return toast.error("category is required")
        if(description.trim()==="") return toast.error("description is required")
        if(!file) return toast.error("file is required")

        const formData=new FormData();
        formData.append("image",file);
        formData.append("title",title)
        formData.append("description",description)
        formData.append("category",category)

        dispatch(createPost(formData));
    };


    const navigate =useNavigate();
    useEffect(()=>{
        if(isPostCreated){
            navigate("/")
        }

    },[isPostCreated,navigate])

    useEffect(()=>{
        dispatch(fetchAllCategories())
    },[])


    return ( 
        <section className="create-post">
            
            <h1 className="create-post-title">
                Create New Post
            </h1>
            <form onSubmit={formSubmitHandler} className="create-post-form">
                <input type="text" placeholder="Post Title" className="create-post-input" value={title} onChange={e=>setTitle(e.target.value)}/>
                <select  value={category} onChange={e=>setCategory(e.target.value)} className="create-post-input">
                    <option disabled value="">
                        Select A Category
                    </option>
                    {categories.map(category => <option key={category._id} value={category.title}>{category.title}</option>)}
                    
                </select>
                <textarea  value={description} onChange={e=>setDescription(e.target.value)} rows="5" className="create-post-textarea" placeholder="Post Description"></textarea>
                <input  onChange={e=>setFile(e.target.files[0])} type="file" name="file" id="file" className="create-post-upload" />
                <button type="submit" 
                className="create-post-btn">
                    {
                        loading ? "Loading..." : "Create"
                    }
                    
                </button>
            </form>
        </section>
    );
}

export default CreatePost;