import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Routes from "./Routes";
import './App.css';
import Header from './Header';
import { getPostsFromAPI, getCategoriesFromAPI } from './actions';


const App = props => {

  const { getPostsFromAPI } = props;

  useEffect(() => {
    const loadFromApi = async () => {
      await getPostsFromAPI();
    }
    loadFromApi();
  });

  return(
    <div>
      <Header />
      <Routes/>
    </div>
  );
}

export default connect(
    null,
    { getPostsFromAPI, getCategoriesFromAPI }
)(App);
