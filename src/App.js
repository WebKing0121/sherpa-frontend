import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { history } from './history';

// pages
import StylesPage from './containers/StylesPage/StylesPage.jsx';
import LoginPage from './containers/LoginPage/LoginPage';
import Header from './containers/Header/Header.jsx';

// components
import { ProtectedRoute } from './components/ProtectedRoute';
import { isAuthenticated } from './store/Auth/selectors';


function App() {
  const is_authenticated = useSelector(isAuthenticated);
  return (
    <Router history={history}>
      <div>
        <Header />
        <Route exact path='/' component={StylesPage} />
        <Switch>
          <ProtectedRoute is_authenticated={is_authenticated} path='/Styles' component={StylesPage} />
          <Route path='/login' component={LoginPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
