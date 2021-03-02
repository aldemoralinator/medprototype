import React from 'react'

export const initialState = { 
  web3: null,
  web3Accounts: null,
  contract: null,
  currentAccount: null
}

export const reducer = (state, action) => {
  switch (action.type) {
    case "setWeb3":
      return { ...state, web3: action.payload }
    case "setWeb3Accounts":
      return { ...state, web3Accounts: action.payload }
    case "setContract":
      return { ...state, contract: action.payload }
    case "setCurrentAccount":
      return { ...state, currentAccount: action.payload }
    default:
      return state
  }
}

export const Context = React.createContext();
