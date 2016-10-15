import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import MainLayout from './templates/MainLayout';

import Home from './components/Home';
import Submit from './components/Submit';
import ShowcaseDetail from './components/ShowcaseDetail';
import Showcase from './components/Showcase';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router history={browserHistory}  {...props}>
    {/* For a template the path isn't needed! */}
    <Route component={MainLayout}>
      <Route path="/" component={Home} />
      <Route path="/Submit" component={Submit} />
      <Route path="/Showcase" component={Showcase} />
      <Route path=":id" component={ShowcaseDetail} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default Routes;