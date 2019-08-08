import React, {Component} from 'react';
import Routes from "./Routes";
import './App.css';
import Header from './Header';
import {getPostsFromAPI} from './actions';
import { connect } from 'react-redux';



class App extends Component{
  componentDidMount() {
    this.props.getPostsFromAPI();
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

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(
    mapStateToProps,
    { getPostsFromAPI }
)(App);