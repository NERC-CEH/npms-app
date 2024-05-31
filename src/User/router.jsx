import { Route } from 'react-router-dom';
import Login from './Login';
import Portal from './Portal';
import Register from './Register';
import Reset from './Reset';

export default [
  <Route path="/user/portal" key="/user/portal" exact render={Portal} />,
  <Route
    path="/user/login/:portal"
    key="/user/login/:portal"
    exact
    component={Login}
  />,
  <Route
    path="/user/register/:portal"
    key="/user/register/:portal"
    exact
    component={Register}
  />,
  <Route
    path="/user/reset/:portal"
    key="/user/reset/:portal"
    exact
    component={Reset}
  />,
];
