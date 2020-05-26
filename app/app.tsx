import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { observer, inject } from "mobx-react";
import loadable from '@loadable/component'

import globalStore from '@store/globalStore';

import styles from './index.scss';
import PageLoading from 'components/PageLoading/index';

const loadableOptions = {fallback: <PageLoading />}
const Home = loadable(() => import(/* webpackChunkName: "login" */ '@pages/Home'), loadableOptions)
const Login = loadable(() => import(/* webpackChunkName: "login" */ '@pages/Login'), loadableOptions)

const AppWrapper: React.FC = ({children}) => {
  return (
    <div className={styles.appWrapper}>
      {children}
    </div>
  )
}

const App = () => {
  return (
    <AppWrapper>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route path="/" component={Home}/>
        </Switch>
      </BrowserRouter>
    </AppWrapper>
  )
}

export default inject(globalStore)(observer(App));
