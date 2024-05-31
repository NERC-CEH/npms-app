import { Route } from 'react-router-dom';
import Menu from './Menu';

const MenuWrap = () => <Menu />;

export default [
  <Route
    path="/settings/menu"
    key="/settings/menu"
    exact
    component={MenuWrap}
  />,
];
