import React, { useContext } from 'react'  
import { Context } from '../store/store'
// import { 
//   Switch,
//   Route, 
//   useParams,
//   useRouteMatch
// } from "react-router-dom"; 

const Account = (props) => {

  console.log(props);

  // let { path, url } = useRouteMatch();

  // let { name } = useParams();

  // console.log(name);


  const { store } = useContext(Context)

  const contractLocal = store.contract;

  const test = async () => {
    console.log(store);
    await contractLocal.methods.getAccounts("0x87f9620CF69ac6a27C787479F03D5EF769BfeBA2").call().then(
      account => console.log(account),
      error => console.log(error)
    ); 
  }

  return (
    <div onClick={()=>test()}>{store.currentAccount && store.currentAccount.name} -- {props.page}</div>
    // <Switch>
    //   <Route exact path={path}>
    //     <h3>This is the account list</h3>
    //   </Route>
    //   <Route path={`${path}/:name`}>
    //     <h3>This is the account item of {name}</h3>
    //   </Route>
    // </Switch>
  )
}

export default Account;