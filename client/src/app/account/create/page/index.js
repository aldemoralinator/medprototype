import React, { useState, useContext } from 'react'  
import { Context } from '../../../store/store'
import Layout from '../../../UI/layout'
import css from './style.module.css'


const AccountCreatePage = () => {

  const { store } = useContext(Context)
  const { contract, web3Accounts } = store

  const [username, setUsername] = useState("");

  const handleTextInput = (e) => {
    const _username = username;
    let string = e.target.value;
    console.log(string.length);
    if (string.length > 13) string = _username;
    setUsername(string);
  }

  const onSubmitUsername = async () => {
    try {
      await contract.methods
        .registerAccount(username)
        .send({ from: web3Accounts[0] });
    } catch (error) {
      console.log("error code: " + error.message)
      alert("Failed registration")
    }
  };  

  return (
    <Layout> 
      <div className={css.main}>
        <div className={css.main_box}>
          <div className={css.main_box_info}>
            <div className={css.main_box_info_primary}>
              Medicine
            </div>
            <div className={css.main_box_info_secondary}>
              Application
            </div>
            <div className={css.main_box_info_tertiary}>
              secured by BlockChain
            </div>
          </div>
          <div className={css.main_box_divider}></div>
          <div className={css.main_box_register}>
            <div className={css.main_box_register_label}>
              For easier identification, <br />
              please provide a username.
            </div>
            <div className={css.main_box_register_input}>
              <input className={css.main_box_register_input_input}
                autoFocus 
                value={username}
                onChange={(e)=>handleTextInput(e)}
                type="text" />
            </div>
            <div className={css.main_box_register_submit} 
              onClick={()=>onSubmitUsername()}
            >
              Submit
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AccountCreatePage;