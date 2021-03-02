import React, { useEffect, useReducer } from 'react'
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

  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect( () => { initializeWeb3() }, [])

  const initializeWeb3 = async () => { 
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
        error => console.log(error)
      );

      dispatch({ type: "setCurrentAccount", payload: currentAccount })
      dispatch({ type: "setWeb3", payload: web3 })
      dispatch({ type: "setWeb3Accounts", payload: web3Accounts })
      dispatch({ type: "setContract", payload: contract })

    } catch (error) {
      alert("Failed to fetch metamask credentials")
      console.log(error);
    }
  } 

  return (
    <Context.Provider value={{ store, dispatch }}>
      <Routes />
    </Context.Provider>
  )
}

export default App;
