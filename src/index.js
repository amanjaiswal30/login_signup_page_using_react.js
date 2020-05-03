import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import reducer from './component/emailreducer'
import { BrowserRouter,Route, Redirect, Switch} from 'react-router-dom';
import SignUp from './component/SignUp';
import Home from './component/Home';
import LoginErrorMessage from './component/LoginErrorMessage';
import SignUpErrorMessage from './component/SignUpErrorMessage';
function saveToLocalStorage(state){
    try{
        const serializedState=JSON.stringify(state)
        localStorage.setItem('state',serializedState)
    }catch(e){
    }
}
function loadToLocalStorage(){
    try{
        const serializedState=localStorage.getItem('state')
        if(serializedState===null) return undefined
        return JSON.parse(serializedState)
    }catch(e){
        return undefined
    }
}
const persistedState=loadToLocalStorage()
export const store1=createStore(reducer,persistedState); 
store1.subscribe(()=>saveToLocalStorage(store1.getState()))
const PrivateRoute=({component:Cmp,...rest})=>(
     <Route {...rest} render={(props)=>(
         localStorage.getItem('login')?(<Cmp{...props}/>):<Redirect to="/"/>
     )}
     />
 )  

ReactDOM.render(
<BrowserRouter><Switch><Provider store={store1}>
    <Route exact path="/" component={App}/>
    <Route path="/signup" component={SignUp}/>
    <Route path="/loginerrormessage" component={LoginErrorMessage}/>
    <Route path="/signuperrormessage" component={SignUpErrorMessage}/>
    <PrivateRoute path="/home" component={Home}/>
    </Provider>
    </Switch>
    </BrowserRouter>
, document.getElementById('root'));