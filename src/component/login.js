import axios from 'axios'
import React, { Component } from "react";
import './style.css'
import {connect} from 'react-redux'
import { withRouter } from 'react-router';
const mapDispatchToProps=(dispatch)=>({

    CHANGE_NAME:(email)=>{dispatch({type:"CHANGE_NAME",payload:email})}
})


const regExp = RegExp
    (
        /^[^0-9][a-zA-Z0-9.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    )
    var strongRegexPass=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");
const formValid = (state) => {
    var data ={
        email : state.email ,
        password : state.password ,
         isValid :state.isValid,
         isRedirect:state.isRedirect
        };
    if(strongRegexPass.test(data.password) && regExp.test(data.email) ){
        data.isValid=true;
        data.isRedirect=true;

    }
    return data.isValid;

};

 class Login extends Component {
    constructor(props) {
        super(props)
        this.redirectToHome=this.redirectToHome.bind(this);
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
     redirectToHome=()=>{
         this.props.CHANGE_NAME(this.state.email);
         localStorage.setItem('login',this.state.email)
         this.props.history.push('/home');
        
    }
    onSubmit = e => {
        e.preventDefault();
        const obj={
            email:this.state.email,
            password:this.state.password
        }
        if (formValid(this.state)) {

            axios.post('http://localhost:3000/authenticate', obj ).then(response=>{this.redirectToHome()}).catch(error=>{this.props.history.push('/loginerrormessage')});
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
                                    <label>Email</label>
                                    <input type="email" required='required' className={isError.email.length > 0 ? "is-invalid form-control" : "form-control"} name="email" onChange={this.formValChange}/>{isError.email.length > 0 && (<span className="invalid-feedback">{isError.email}</span>)}
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className={isError.password.length > 0 ? "is-invalid form-control" : "form-control"} name="password" onChange={this.formValChange}/>{isError.password.length > 0 && (<span className="invalid-feedback">{isError.password}</span>)}
                                        </div>
                                        <div>
                                        <button type="submit"  className="btn btn-block btn-success">Login</button>
                                        <button className="btn btn-block btn-success" onClick={()=>{this.props.history.push('/signup')}}>Not A Registered User?Signup</button>
                                        </div>
                                        </form>
                        );
                                    }
                                }
                                Login=withRouter(Login);
                                export default connect(mapDispatchToProps,mapDispatchToProps)(Login);