import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import PostDetails from './PostDetails';
import NewPostForm from './NewPostForm';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home />}/>
				<Route exact path="/new"	 render={() => <NewPostForm />} />

        <Route exact path="/posts/:id" render={(routerProps) =>
          <PostDetails {...routerProps} /> }/>	
        <Redirect to="/" />
      </Switch>
    );
  }
}


export default Routes