import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import PostDetails from './PostDetails';
import NewPostForm from './NewPostForm';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" render={() => <Home posts={this.props.posts}/>}/>
				
				<Route exact path="/new"	 render={() => 
          <NewPostForm 
            addBlogPost={this.props.addBlogPost}
          />}
          />

          <Route exact path="/posts/:id" render={(routerProps) =>
          <PostDetails {...routerProps}
            posts={this.props.posts}
            updateBlogPost={this.props.updateBlogPost}
            deletePost={this.props.deletePost}
        /> }/>	

        <Redirect to="/" />
      </Switch>
    );
  }
}


export default Routes