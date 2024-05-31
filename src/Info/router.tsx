import { Route } from 'react-router-dom';
import About from './About';
import Credits from './Credits';
import Help from './Help';
import Resources from './Resources';

export default [
  <Route path="/info/about" key="/info/about" exact component={About} />,
  <Route
    path="/info/resources"
    key="/info/resources"
    exact
    component={Resources}
  />,
  <Route path="/info/credits" key="/info/credits" exact component={Credits} />,
  <Route path="/info/help" key="/info/help" exact component={Help} />,
];
