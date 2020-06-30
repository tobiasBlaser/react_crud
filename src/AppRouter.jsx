import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Login from './components/Login/Login';
import Tracks from './components/Tracks/Tracks';

const AppRouter = () => {
  return (
    <div id="router-container">
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/tracks" component={Tracks} />
        <Route component={Login} />
      </Switch>
    </div>
  );
};

export default withRouter(AppRouter);
