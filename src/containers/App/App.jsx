import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import en_US from 'antd/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd';
import routes from './routes';
import Layout from '../Layout/Layout';
import DashBoard from '../DashBoard/DashBoard';
import User from '../User/User';
import Role from '../Role/Role';
import Page from '../Page/Page';
import Feature from '../Feature/Feature';

function App() {
  return (
    <LocaleProvider locale={en_US}>
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path={routes.dashboard} component={DashBoard} />
            <Route exact path={routes.user} component={User} />
            <Route exact path={routes.role} component={Role} />
            <Route exact path={routes.page} component={Page} />
            <Route exact path={routes.feature} component={Feature} />
          </Switch>
        </Layout>
      </BrowserRouter>
    </LocaleProvider>
  );
}

export default App;
