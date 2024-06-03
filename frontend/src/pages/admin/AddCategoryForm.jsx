import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { createCategory } from "../../redux/apicalls/categoryApiCall";
const AddCategoryForm = () => {
    
    const dispatch=useDispatch();

    const [title,setTitle]=useState("");

    const formSubmitHandler =(e)=>{
        e.preventDefault();

        if(title.trim()==="") return toast.error("Title is required");

        dispatch(createCategory({title}));
        setTitle("");
    }

    return ( 
    <div className="add-category">
        <h6 className="add-category-title">Add New Category</h6>
        <form onSubmit={formSubmitHandler} className="add-category-form">
            <div className="add-category-form-group">
                <label htmlFor="title">Category Title</label>
                <input type="text" id="title" 
                placeholder="Enter category title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>
            <button className="add-category-btn" type="submit">Add</button>
        </form>

    </div> );
}

export default AddCategoryForm;