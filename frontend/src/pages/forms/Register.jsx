import { Link , useNavigate } from "react-router-dom";
import "./forms.css"
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch , useSelector } from "react-redux"
import { RegisterUser } from "../../redux/apicalls/authapicall";
import swal from "sweetalert";
const Register = () => {

    const dispatch=useDispatch();
    const {registerMessage}=useSelector(state => state.auth)

    const[username,setUsername]=useState("");
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const formSubmitHandler =(e)=>{
        e.preventDefault();

        if(username.trim()==="") return toast.error("Username is required");
        if(email.trim()==="") return toast.error("Email is required");
        if(password.trim()==="") return toast.error("Password is required");

        
        dispatch(RegisterUser({username,email,password}))
    }
    const navigate=useNavigate()

    if(registerMessage){
        swal({
            title:registerMessage,
            icon:"success"
        }).then(isOk=>{
            if(isOk){
                navigate("/login")
            }
        })
    }
    
    return ( 
        <section className="form-container">
            <h1 className="form-title">Create new account</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-input" 
                    placeholder="Enter your username" id="username"
                    value={username} onChange={(e)=>setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-input" 
                    placeholder="Enter your email" id="email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-input" 
                    placeholder="Enter your password" id="password"
                    value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="form-btn">
                    Register
                </button>
            </form>
            <div className="form-footer">
                Already have an account?<Link to={`/login`}>Login</Link>
            </div>
        </section>
    );
}

export default Register;