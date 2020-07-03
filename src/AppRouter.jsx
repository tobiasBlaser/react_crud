import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LoginRender from './components/LoginRender/LoginRender';
import Tracks from './components/Tracks/Tracks';

const AppRouter = () => {
  return (
    <div id="router-container">
      <Switch>
        <Route exact path="/" component={LoginRender} />
        <Route exact path="/tracks" component={Tracks} />
        <Route component={LoginRender} />
      </Switch>
    </div>
  );
};

export default withRouter(AppRouter);
