import AdminSidebar from "./AdminSidebar"
import "./admin-table.css"
import swal from "sweetalert";
import {useDispatch,useSelector } from "react-redux"
import { useEffect } from "react";
import { deleteCategory, fetchAllCategories } from "../../redux/apicalls/categoryApiCall";


const CategoriesTable = () => {

    const dispatch=useDispatch();
    const {categories} = useSelector(state =>state.category)

    useEffect(()=>{
        dispatch(fetchAllCategories())
    },[])
    
    const deleteCategoryHandler=(categoryId)=>{
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this category!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }).then((isOk)=>{
            if(isOk){
                dispatch(deleteCategory(categoryId))
            }
        });
    }


    return ( 
        <section className="table-container">
            <AdminSidebar />
            <div className="table-wrapper">
                <h1 className="table-title">Categories</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Count</th>
                            <th>Category Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.map((item,index)=>(
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <b>{item.title}</b>
                                </td>
                                <td className="table-button-group">
                                    <button onClick={()=>deleteCategoryHandler(item._id)}>Delete Category</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default CategoriesTable;