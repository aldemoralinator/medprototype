import React, { Component } from "react"; 
import './Account.css';

export class Account extends Component {

    state = {
        accounts: [],
        totalAccounts: 0,
        accountAddresses: [],
    } 

    componentDidMount = async () => { 
        await this.getAccounts()
    }; 

    getAccount = async (address) => {
        let result = null;
        await this.props.contract.methods.getAccounts(address).call().then(
          account => result = account,
          error => console.log(error)
        ); 
        return result;
    }

    getAccounts = async () => {
        const { contract } = this.props;
        const { accountAddresses } = this.state;

        this.setState({ totalAccounts: await contract.methods.getAccountCount().call() })

        for (let i = 1; i <= this.state.totalAccounts; i++) {
            let returnedAddress = await contract.methods.getAccountAddress(i).call() 
            let newAccountAddresss = this.state.accountAddresses
            newAccountAddresss.push( returnedAddress )
            this.setState({accountAddresses: newAccountAddresss});
        } 

        accountAddresses.map( async (address, index) => {
            let newAccounts = this.state.accounts;
            let account = await this.getAccount(address); 
            newAccounts.push( account )  
            this.setState({ accounts: newAccounts })
        } )
    }

    approveAccount = async (address) => {
        const { web3Accounts, contract } = this.props;
        await contract.methods.allowAccount(address).send({ from: web3Accounts[0] });
    }

    removeAccount = async (address) => {
        const { web3Accounts, contract } = this.props;
        await contract.methods.removeAccount(address).send({ from: web3Accounts[0] });
    }

    render() {
 
        const { accounts } = this.state; 

        return (
            <div className="acct"> 
                <div className="acct__title">All Accounts</div>
                <div className="acct__list">
                    {accounts.map( (account, index ) => 
                        <div key={index} className="acct__item">
                            <div className="acct__item__attribute" >
                                <span>Address:</span>
                                {account.accountAddress}
                            </div>
                            <div className="acct__item__attribute">
                                <span>Name:</span>
                                {account.name}
                            </div> 
                            { account.role != 0 ?
                                <div className="acct__item__attribute">
                                    <span>Membership:</span>
                                    { account.isMember ? 
                                        <div className="acct__item__attribute__remove"
                                            onClick={()=>this.removeAccount(account.accountAddress)}
                                        >
                                            remove
                                        </div> :
                                        <div className="acct__item__attribute__accept"
                                            onClick={()=>this.approveAccount(account.accountAddress)}
                                        >   
                                            accept
                                        </div>
                                    }
                                </div> :
                                <span></span>
                            }
                            
                        </div>
                    )}
                </div> 
            </div>
        );
    }
}  
export default Account;