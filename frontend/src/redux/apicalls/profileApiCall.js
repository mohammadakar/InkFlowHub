import {profileActions} from "../slices/profileSlice";
import request from "../../utils/request"
import {toast} from "react-toastify"
import {authActions} from "../slices/authSlicee"

export function getUserProfile(userId){
    return async (dispatch)=>{
        try {
            const res=await request.get(`/api/users/profile/${userId}`)
            dispatch(profileActions.setProfile(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function uploadProfilePhoto(newPhoto){
    return async (dispatch,getState)=>{
        try {
            
            const res=await request.post(`/api/users/profile/profile-photo-upload`,newPhoto,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                    "content-type":"multipart/form-data"
                }
            });
            dispatch(profileActions.setProfilePhoto(res.data.profilePhoto));
            
            dispatch(authActions.setUserPhoto(res.data.profilePhoto));

            toast.success(res.data.message);

            const user =JSON.parse(localStorage.getItem("userInfo"));
            user.profilePhoto=res.data?.profilePhoto;
            localStorage.setItem("userInfo",JSON.stringify(user))
        } catch (error) {
            console.log(error)
            
        }

    }
}

export function updateProfile(userId,profile){
    return async (dispatch,getState)=>{
        try {
            
            const res=await request.put(`/api/users/profile/${userId}`,profile,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                    
                }
            });
            dispatch(profileActions.updateProfile(res.data));
            
            dispatch(authActions.setUsername(res.data.username));


            const user =JSON.parse(localStorage.getItem("userInfo"));
            user.username=res.data?.username;
            localStorage.setItem("userInfo",JSON.stringify(user))
        } catch (error) {
            toast.error(error.response.data.message);
            
        }

    }
}

export function deleteProfile(userId){
    return async (dispatch,getState)=>{
        try {
            dispatch(profileActions.setLoading())
            const res=await request.delete(`/api/users/profile/${userId}`,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                    
                }
            });
            dispatch(profileActions.setIsProfileDeleted());
            toast.success(res.data.message)
            setTimeout(()=>dispatch(profileActions.clearIsProfileDeleted()),2000)
        } catch (error) {
            toast.error(error.response.data.message);
            dispatch(profileActions.clearLoading())
        }

    }
}

export function getUsersCount(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get(`/api/users/count`,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                    
                }
            });
            dispatch(profileActions.setUserCount(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}

export function getAllUsersProfile(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get(`/api/users/profile`,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token,
                    
                }
            });
            dispatch(profileActions.setProfiles(res.data));
        } catch (error) {
            toast.error(error.response.data.message);
        }

    }
}