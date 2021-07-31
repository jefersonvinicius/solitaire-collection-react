import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from 'pages/Home';
import PyramidGame from 'pages/PyramidGame';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/pyramid-game">
          <PyramidGame />
        </Route>
      </Switch>
    </Router>
  );
}
