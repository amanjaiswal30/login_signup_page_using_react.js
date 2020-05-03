
import React  from 'react'
import './style.css'


 function SignUpErrorMessage() {

        return (
            <form className="form">
            <legend className="legend">Email ID alrerady exists</legend>
            <button  className="btn btn-block btn-success" onClick={()=>{this.props.history.push("/")}}>Click To Login </button>
            <button  className="btn btn-block btn-success"  onClick={()=>{this.props.history.push("/signup")}}>Click To Signup </button>
        </form>
           
        )
}
export default SignUpErrorMessage;
