import {authActions} from "../slices/authSlicee";
import request from "../../utils/request"
import {toast} from "react-toastify"


export function loginUser(user){
    return async (dispatch)=>{
        try {
            const res=await request.post("/api/auth/login",user)
            dispatch(authActions.login(res.data));
            localStorage.setItem("userInfo",JSON.stringify(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function logoutUser(user){
    return  (dispatch)=>{
        dispatch(authActions.logout());
        localStorage.removeItem("userInfo");
    }
}

export function RegisterUser(user){
    return async (dispatch)=>{
        try {
            const res=await request.post("/api/auth/register",user)
            dispatch(authActions.register(res.data.message));
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function verifyEmail(userId,token){
    return async (dispatch)=>{
        try {
            await request.get(`/api/auth/${userId}/verify/${token}`)
            dispatch(authActions.setIsEmailVerified());
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}