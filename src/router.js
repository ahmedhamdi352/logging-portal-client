import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';
import queryString from 'query-string';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const PublicRoutes = ({ history }) => {
  const { isAuthenticated } = useSelector(({ Auth }) => Auth);
  if (history.location.search) {
    const { redirect } = queryString.parse(history.location.search);
    if (isAuthenticated && !!redirect) history.push(redirect);
  }

  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={asyncComponent(() => import('./containers/Page/signin'))} />
        <Route exact path={'/404'} component={asyncComponent(() => import('./containers/Page/404'))} />
        <Route exact path={'/500'} component={asyncComponent(() => import('./containers/Page/500'))} />
        <Route exact path={'/signin'} component={asyncComponent(() => import('./containers/Page/signin'))} />
        <RestrictedRoute
          path="/dashboard"
          component={App}
          // component={asyncComponent(() =>
          //   import("./containers/Page/resetPassword")
          // )}
          isLoggedIn={isAuthenticated}
        />
        <Route component={asyncComponent(() => import('./containers/Page/404'))} />
      </Switch>
    </Router>
  );
};
export default PublicRoutes;
