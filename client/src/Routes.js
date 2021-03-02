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
import AccountCreate from './app/account/create';
import AccountWaiting from './app/account/waiting';
import AccountTest from './app/UI/components/account/Account';

const Routes = () => {

  const { store } = useContext(Context)

  const {web3, web3Accounts, contract, currentAccount} = store

  if (!web3) return <InstallMetamask />;

  if (currentAccount && currentAccount.accountAddress == 0) return <AccountCreate />;

  if (currentAccount && !currentAccount.isMember) return <AccountWaiting />;

  // return <AccountTest web3={web3} web3Accounts={web3Accounts} contract={contract} currentAccount={currentAccount} />

  return (
    <Router>
      <Switch>
        <Route path="/install-metamask">
          <InstallMetamask />
        </Route>
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