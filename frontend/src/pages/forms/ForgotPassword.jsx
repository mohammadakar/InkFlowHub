
import "./forms.css"
import { useState } from "react";
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import { forgotPassword } from "../../redux/apicalls/passwordApiCall";

const ForgotPassword = () => {
    const dispatch=useDispatch();
    
    const[email,setEmail]=useState("");

    const formSubmitHandler =(e)=>{
        e.preventDefault();

        if(email.trim()==="") return toast.error("Email is required");

        dispatch(forgotPassword(email));
    }
    return ( 
        <section className="form-container">
            <h1 className="form-title">Forgot Password</h1>
            <form onSubmit={formSubmitHandler} className="form">
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-input" 
                    placeholder="Enter your email" id="email"
                    value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <button type="submit" className="form-btn">
                    Submit
                </button>
            </form>

        </section>
    );
}

export default ForgotPassword