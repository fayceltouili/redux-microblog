import React, {Component} from 'react';
import Routes from "./Routes";
import './App.css';
import Header from './Header';


export default class App extends Component{
  render(){
    return(
        <div>
          <Header />
          <Routes/>
        </div>
    );
  }
}