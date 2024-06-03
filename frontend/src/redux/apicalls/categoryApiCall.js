import {categoryActions} from "../slices/categorySlice";
import request from "../../utils/request"
import {toast} from "react-toastify"


export function fetchAllCategories(){
    return async (dispatch)=>{
        try {
            const res=await request.get("/api/categories")
            dispatch(categoryActions.setCategories(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function createCategory(newCategory){
    return async (dispatch,getState)=>{
        try {
            const res=await request.post("/api/categories",newCategory,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(categoryActions.createCategory(res.data));
            toast.success("category created successfully")
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function deleteCategory(categoryId){
    return async (dispatch,getState)=>{
        try {
            const res=await request.delete(`/api/categories/${categoryId}`,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(categoryActions.deleteCategory(res.data.categoryId));
            toast.success(res.data.message)
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}