
import React, { Component } from "react";
import axios from 'axios';
import './style.css'
const regExp = RegExp
    (
        /^[^0-9][a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    )
    var strongRegexPass=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");
const formValid = (state) => {
    var data ={  
        email : state.email ,
        password : state.password ,
         isValid :state.isValid
        };
    if(strongRegexPass.test(data.password) && regExp.test(data.email) ){
        data.isValid=true;
    }
    return data.isValid;
};
class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isValid : false,
            isError: {
                email: '',
                password: ''
            }
        }
    }
    redirectToLogin=()=>{
       this.props.history.push('/');
   }
    onSubmit = e => {
        e.preventDefault();
        const obj={
            email:this.state.email,
            password:this.state.password
        }
        if (formValid(this.state)) {
            axios.post('http://localhost:3000/register', obj ).then(response=>{this.redirectToLogin()}).catch(error=>{this.props.history.push('/signuperrormessage')});
        }
    };
    formValChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        let isError = { ...this.state.isError };
        switch (name) {
                case "email":
                    isError.email = regExp.test(value)
                    ? "": "Email address is invalid";
                    break;
                    case "password":
                        isError.password =strongRegexPass.test(value) ? "" : "Length of Password should be atleast 6 and it should have atleast 1 Uppercase, 1 Lowercase, 1 Numeric Value and a Special Character ";
                        break;
                        default:
                            break;
                        }
                        this.setState({
                            isError,
                            [name]: value
                        })
                    };
                    render() {
                        const { isError } = this.state;
                        return (
                        <form className="form" onSubmit={this.onSubmit} >
                            <legend className="legend">Sentiment Analysis Application</legend>
                                <div className="form-group">
                                    <label>Enter Email</label>
                                    <input type="email" required='required' className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"} name="email" onChange={this.formValChange}/>{isError.email.length > 0 && (<span className="invalid-feedback">{isError.email}</span>)}
                                    </div>
                                    <div className="form-group">
                                        <label>Create Password</label>
                                        <input type="password" className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"} name="password" onChange={this.formValChange}/>{isError.password.length > 0 && (<span className="invalid-feedback">{isError.password}</span>)}
                                        </div>
                                        <div>
                                        <button className="btn btn-block btn-success">Sign Up</button>
                                        <button className="btn btn-block btn-success" onClick={()=>{this.props.history.push('/')}}>Already a User?Login</button>
                                        </div>
                                        </form>
                                        );
                                    }
                                }
                                export default SignUp;