import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import PostDetails from './PostDetails';
import MyEditor from './MyEditor'

const Routes = () => {

  return (
    <Switch>
      <Route exact path="/" render={() => <Home />}/>
      <Route exact path="/new" render={() => <MyEditor />} />
      <Route exact path="/posts/:id" render={routerProps =>
        <PostDetails {...routerProps} /> }/>	
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
