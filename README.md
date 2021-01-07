# medprototype
import React, { Component } from "react";
import NestedStructContract from "./contracts/NestedStruct.json";
import getWeb3 from "./getWeb3";
import HomePage from "./components/HomePage"

import "./App.css";

class App extends Component {

  state = { 
    totalAccounts: 0,
    accountAddresses: [],
    allAccounts: [],
    searchedAccount: null,
    web3: null, 
    web3Accounts: null, 
    contract: null,
    currentAccount: null,
    inputAccountAddress: ""
  };

  componentDidMount = async () => {
    try { 
      const web3 = await getWeb3(); 
      const web3Accounts = await web3.eth.getAccounts(); 
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = NestedStructContract.networks[networkId];
      const contract = new web3.eth.Contract(
        NestedStructContract.abi,
        deployedNetwork && deployedNetwork.address,
      ); 

      let currentAccount = null; 

      await contract.methods.getAccounts(web3Accounts[0]).call().then(
        account => currentAccount = account,
        error => console.log("error")
      ); 

      this.setState({ web3, web3Accounts, currentAccount, contract: contract });

      if (currentAccount.role == 1) {
        await this.getAccountCount()
        this.getAllAccountAddresses()
      };
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  registerAccount = async () => {
    const { web3Accounts, contract } = this.state;
    await contract.methods.registerAccount("Aldem", 0).send({from: web3Accounts[0]});
    this.runExample();
  }; 

  getAccountCount = async () => {
    this.setState({ totalAccounts: await this.state.contract.methods.getAccountCount().call() })
  }

  getAllAccountAddresses = async () => { 
    for (let i = 1; i <= this.state.totalAccounts; i++) {
      let returnedAddress = await this.state.contract.methods.getAllAccountAddresses(i).call() 
      let newAccountAddresss = this.state.accountAddresses
      this.setState({AccountAddresses: newAccountAddresss.push( returnedAddress )});
    } 
  }

  getAccount = async (address) => {
    console.log("executed", address);
    this.state.contract.methods.getAccounts(address).call().then(
      account => this.setState({ searchedAccount: account }),
      error => console.log(error)
    ); 
  }

  onSubmitAccountSearch = (event) => {
    event.preventDefault(); 

    this.getAccount(this.state.inputAccountAddress)
  }

  onChangeAccountSearchInput = (event) => {
    this.setState({ inputAccountAddress: event.target.value});
  }

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="" > 
        {
          this.state.currentAccount ?
            <div>Welcome</div> :
            <HomePage></HomePage>
        }
        
       
      </div>
    );
  }
}

export default App;

// runExample = async () => {
//   const { accounts, contract } = this.state;

//   // Stores a given value, 5 by default.
//   const totalAccounts = await contract.methods.getAccountCount().call();

//   // Get the value from the contract to prove it worked.
//   // const response = await contract.methods.get().call();

//   // Update state with the result.
//   this.setState({ 
//     totalAccounts: await contract.methods.getAccountCount().call(), 
//     totalPackages: await contract.methods.getAccountCount().call(),
//   });
// };

// { this.state.currentAccount.role == 3 
//   ? <div>
//       <h1>Welcome to App</h1>
//       <span>get total accounts on contract</span> { this.state.totalAccounts } <br />
//       <span>get all account addresses</span> { this.state.accountAddresses.toString() } <br />
//       <div onClick={() => this.getAccount("0x39b03B761C159D670D70CE60D2e6C2b2Ef9dAf3B")}>register that nigga</div>
//     </div> 
//   : <div onClick={this.registerAccount}>register</div> 
// }
// {
// this.state.currentAccount.isApproved 
//   ? <div>
//       <hr />
//       <div style={{ display: "flex" } }>
//         <form onSubmit={this.onSubmitAccountSearch}> 
//           <p>find account</p>
//           <input type='text' onChange={this.onChangeAccountSearchInput} />
//           <input type='submit'/>
//         </form>
//         <div>
//           <div>address: { this.state.searchedAccount && this.state.searchedAccount.accountAddress }</div>
//           <div>name: { this.state.searchedAccount && this.state.searchedAccount.name }</div>
//           <div>role: { this.state.searchedAccount && this.state.searchedAccount.role }</div>
//           <div>isApproved: { this.state.searchedAccount && (this.state.searchedAccount.isApproved ? "true" : "false") }</div>
//         </div>
//       </div>
//     </div>
//   : <div></div>
// }