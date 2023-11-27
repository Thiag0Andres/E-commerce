import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home, Profile } from '..';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route exact path="/profile" component={Profile} />
      <Redirect from="/" to="/Home" />
      <Redirect from="*" to="/" />
    </Switch>
  );
}
