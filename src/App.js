import React, {Component} from 'react';
import Routes from "./Routes";
import './App.css';
import Header from './Header';
import {getPostsFromAPI, getCategoriesFromAPI} from './actions';
import { connect } from 'react-redux';



class App extends Component{
  componentDidMount() {
    this.props.getPostsFromAPI();
    this.props.getCategoriesFromAPI();
  }
  render(){

    return(
        <div>
          <Header />
          <Routes/>
        </div>
    );
  }
}



export default connect(
    null,
    { getPostsFromAPI, getCategoriesFromAPI}
)(App);