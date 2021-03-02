import React, { useContext } from 'react'
import { Context } from './app/store/store'

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './app/home'
import Account from './app/account'
import Package from './app/package'
import Error from './app/error'
import InstallMetamask from './app/install-metamask';

const Routes = () => {

  const { store } = useContext(Context)

  const {web3, currentAccount} = store

  if (!web3) return <InstallMetamask />;

  if (currentAccount && currentAccount.accountAddress === 0) return <Account />; // create

  if (currentAccount && !currentAccount.isMember) return <Account />; // pending

  return (
    <Router>
      <Switch>
        <Route path="/accounts">
          <Account />
        </Route>
        <Route path="/packages">
          <Package />
        </Route>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="*">
          <Error />
        </Route> 
      </Switch>
    </Router> 
  )
}

export default Routes;