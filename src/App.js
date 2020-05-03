import React, { Component } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './component/login';



class App extends Component {
render(){
  return (
    <div id="root">
      <Login/>
      </div>

  );
}

}



export default App;