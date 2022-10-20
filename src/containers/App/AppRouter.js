import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import asyncComponent from '../../helpers/AsyncFunc';

const routes = [
  // {
  //   path: '',
  //   component: asyncComponent(() => import('../Dashboard/index')),
  // },
  {
    path: 'new',
    component: asyncComponent(() => import('../Documents/NewDocument')),
  },
  {
    path: 'company/new',
    component: asyncComponent(() => import('../Company/NewCompany')),
  },
  {
    path: 'log',
    component: asyncComponent(() => import('../Logging')),
  },
  {
    path: 'logs/all',
    component: asyncComponent(() => import('../Documents/AllDocuments')),
  },

  {
    path: 'doc/:documentId',
    component: asyncComponent(() => import('../Documents/DocumentDetails')),
  },
  {
    path: 'doc/json/:documentId',
    component: asyncComponent(() => import('../Documents/DocumentDetailsJSON')),
  },
  {
    path: 'setting',
    component: asyncComponent(() => import('../Setting')),
  },

  // {
  //   path: "clients/new",
  //   component: asyncComponent(() => import("../Clients/ClientForm/index"))
  // },

  // {
  //   path: "clients",
  //   component: asyncComponent(() => import("../Clients/ClientsTable/index"))
  // }
];

class AppRouter extends Component {
  render() {
    const { url, style } = this.props;
    return (
      <div style={style}>
        {routes.map((singleRoute) => {
          const { path, exact, ...otherProps } = singleRoute;
          return <Route exact={exact === false ? false : true} key={singleRoute.path} path={`${url}/${singleRoute.path}`} {...otherProps} />;
        })}
      </div>
    );
  }
}

export default AppRouter;
