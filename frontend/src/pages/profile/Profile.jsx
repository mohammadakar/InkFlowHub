import "./profile.css"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {useDispatch,useSelector} from "react-redux"
import swal from "sweetalert";
import UpdateProfileModal from "./updateProfileModal"
import { deleteProfile, getUserProfile, uploadProfilePhoto } from "../../redux/apicalls/profileApiCall"
import { useParams , useNavigate } from "react-router-dom"
import PostItem from "../../components/posts/PostItem"
import {logoutUser} from "../../redux/apicalls/authapicall"
const Profile = () => {

    const dispatch=useDispatch();
    const {profile , loading , isProfileDeleted}=useSelector(state =>state.profile)
    const {user}=useSelector(state =>state.auth)

    const [file,setFile]=useState(null)
    const [updateProfile,setUpdateProfile]=useState(false);

    const {id}=useParams();

    useEffect(()=>{
        dispatch(getUserProfile(id))
        window.scrollTo(0,0);
    },[id]);
    
    const navigate=useNavigate();
    useEffect(()=>{
        if(isProfileDeleted){
            navigate("/");
        }
    },[navigate,isProfileDeleted])

    const formSubmitHandler=(e)=>{
        e.preventDefault();

        if(!file) return toast.error("no file provided");

        const formData=new FormData();
        formData.append("image",file)

        dispatch(uploadProfilePhoto(formData))
    }

    const deleteAccountHandler=()=>{
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover your profile!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false
        }).then((isOk)=>{
            if(isOk){
                dispatch(deleteProfile(user?._id))
                dispatch(logoutUser())
            }
        });
    }
    
    if(loading){
        return (<p className="profile-load">Loading...</p>)
    }

    return ( 
        <section className="profile">
            <div className="profile-header">
                <div className="profile-image-wrapper">
                    <img src={file ? URL.createObjectURL(file):profile?.profilePhoto.url} alt="" 
                className="profile-image" 
                />
                {
                    user?._id === profile?._id && (
                        <form onSubmit={formSubmitHandler}>
                    <abbr title="choose profile photo">
                        <label htmlFor="file" className="bi bi-camera-fill upload-profile-photo-icon"></label>
                        <input style={{display:"none"}} 
                        type="file" 
                        name="file" 
                        id="file" 
                        onChange={(e)=>setFile(e.target.files[0])}/>
                        <button className="upload-profile-photo-btn" type="submit">Upload</button>
                    </abbr>
                </form>
                    )
                }
                </div>
                <h1 className="profile-username">{profile?.username}</h1>
                <p className="profile-bio">
                    {profile?.bio}
                </p>
                <div className="user-date-joined">
                    <strong>Date joined:</strong>
                    <span>{new Date(profile?.createdAt).toDateString()}</span>
                </div>
                {
                    user?._id === profile?._id && (
                        <button onClick={()=>setUpdateProfile(true)} className="profile-update-btn">
                            <i className="bi bi-file-person-fill"></i>
                            Update Profile
                        </button>

                    )
                }
                
                
            </div>
            <div className="profile-posts-list">
                <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
                {
                    profile?.posts?.map(post =>
                    <PostItem 
                    key={post._id} 
                    post={post} 
                    username={profile?.username}
                    userId={profile?._id}
                    />)
                }
            </div>
            {
                user?._id === profile?._id && (
                    <button onClick={deleteAccountHandler} className="delete-account-btn">
                        Delete your account
                    </button>
                )
            }
            {updateProfile && (<UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile}/>)}
        </section>
    );
}

export default Profile;