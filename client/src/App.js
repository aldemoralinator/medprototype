import React, { useEffect, useReducer, useState } from 'react'
import HerbalMedicine from "./contracts/HerbalMedicine.json";
import getWeb3 from "./getWeb3"; 
import "./App.css";
import { 
  Context, 
  initialState, 
  reducer 
} from './app/store/store'
import Routes from './Routes'

const App = () => {

  const [isFetchingWeb3Credentials, setIsFetchingWeb3Credentials] = useState(true);

  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect( () => { initializeWeb3() }, [])

  const initializeWeb3 = async () => { 
    try {
      let web3 = null;

      setTimeout( function() { 
        if (web3 == undefined || web3 == null) {
          setIsFetchingWeb3Credentials(false);
          return;
        } 
      }, 3000);

      web3 = await getWeb3();
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
        error => console.log(error)
      );

      dispatch({ type: "setCurrentAccount", payload: currentAccount })
      dispatch({ type: "setWeb3", payload: web3 })
      dispatch({ type: "setWeb3Accounts", payload: web3Accounts })
      dispatch({ type: "setContract", payload: contract })

      setIsFetchingWeb3Credentials(false);
    } catch (error) {
      alert("Failed to fetch metamask credentials")
      console.log(error);
      setIsFetchingWeb3Credentials(false)
    }
  } 

  console.log(isFetchingWeb3Credentials);

  if (isFetchingWeb3Credentials) {
    return "loading"
  }
  
  if (!isFetchingWeb3Credentials) {
    return (
      <Context.Provider value={{ store, dispatch }}>
        <Routes />
      </Context.Provider>
    )
  }
  
}

export default App;
