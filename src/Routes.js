
import React from 'react';
import { Switch, Route } from 'react-router-dom';
//import DashBoard from './components/DashBoard';
import Terminal from './components/Terminal';
import SignIn from './components/SignIn';
import Integrations from './components/Integrations';
import ProtectedRoute from './Utils/ProtectedRoute';
import Register from './components/Register';
import Documentation from './components/documentation';


const Routes = () => {
  return (
    <Switch>
      {/* //Todo: ebable DashBoard routes after the demo */}
      {/* <ProtectedRoute path="/dashboard" component={DashBoard} /> */}
      <Route path="/documentation" component={Documentation} />
      <Route path="/terminal" component={Terminal} />
      <Route path="/integrations" component={Integrations} />
      <Route path="/register" component={Register} />
      <Route path="/" component={SignIn} />
      {/* Add more routes as needed */}
    </Switch>
  );
};

export default Routes;
