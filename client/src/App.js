import React, { Component } from "react";
import HerbalMedicine from "./contracts/HerbalMedicine.json";
import getWeb3 from "./getWeb3";
import HomePage from "./components/homepage/HomePage"
import Account from "./components/account/Account"
import Package from "./components/package/Package"

import "./App.css";

class App extends Component {

  state = {     
    web3: null, 
    web3Accounts: null, 
    contract: null,
    currentAccount: null, 
  };

  componentDidMount = async () => {
    try { 
      const web3 = await getWeb3(); 
      const web3Accounts = await web3.eth.getAccounts(); 
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = HerbalMedicine.networks[networkId];
      const contract = new web3.eth.Contract(
        HerbalMedicine.abi,
        deployedNetwork && deployedNetwork.address,
      );  

      let currentAccount = null; 

      await contract.methods.getAccounts(web3Accounts[0]).call().then(
        account => currentAccount = account,
        error => console.log("error")
      ); 

      this.setState({ web3, web3Accounts, currentAccount, contract });
    } catch (error) { 
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  render() {
    const { web3, web3Accounts, currentAccount, contract } = this.state;

    if (!web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }


    return (
      <div className="component" > 
        {
          currentAccount.isMember ?
            <div className="component__main">
              <div className="component__main__left">
                <Package 
                  web3={web3} 
                  web3Accounts={web3Accounts} 
                  currentAccount={currentAccount} 
                  contract={contract}/>
              </div>
              <div className="component__main__right">
                <Account 
                  web3={web3} 
                  web3Accounts={web3Accounts} 
                  currentAccount={currentAccount} 
                  contract={contract} />
              </div>
            </div> :
            <HomePage 
              web3={web3} 
              web3Accounts={web3Accounts} 
              currentAccount={currentAccount} 
              contract={contract}/>
        } 
      </div>
    );
  }
}

export default App; 