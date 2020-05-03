import React, { Component } from 'react'

import './style.css'
class LoginErrorMessage extends Component{
    render(){
        return (
                 <form className="form">
                     <legend className="legend">Invalid Credentials</legend>
                     <button  className="btn btn-block btn-success" onClick={()=>{this.props.history.push('/')}}>Click To Login </button>
                     <button  className="btn btn-block btn-success"  onClick={()=>{this.props.history.push('/signup')}}>Click To Signup </button>
                 </form>
           
        )
    }
}
export default LoginErrorMessage;