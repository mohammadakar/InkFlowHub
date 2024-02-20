import { Link } from "react-router-dom";
import "./forms.css"
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { loginUser } from "../../redux/apicalls/authapicall";
const Login = () => {
    
    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const dispatch=useDispatch();

    const formSubmitHandler =(e)=>{
        e.preventDefault();

        if(email.trim()==="") return toast.error("Email is required");
        if(password.trim()==="") return toast.error("Password is required");

        
        dispatch(loginUser({email,password}))
    }
    return ( 
        <section className="form-container">
            <h1 className="form-title">Login to your account</h1>
            <form onSubmit={formSubmitHandler} className="form">
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
                    Login
                </button>
            </form>
            <div className="form-footer">
                Did you forgot your password?<Link to={`/forgot-password`}>Forget Password</Link>
            </div>
        </section>
    );
}

export default Login