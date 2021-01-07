import React, { Component } from "react"; 
import './HomePage.css';

export class HomePage extends Component {

    state = {      
        inputName: "" 
    };

    onSubmitRegisterAccount = (event) => {
        event.preventDefault();   
        if (this.state.inputName != "") this.registerAccount();
    }
    
    onChangeSetInputAccountName = (event) => {
        this.setState({ inputName: event.target.value });
    } 

    registerAccount = async () => {
        const { web3Accounts, contract } = this.props;
        await contract.methods
                .registerAccount(this.state.inputName)
                .send({ from: web3Accounts[0] });
    };  

    render() { 

        return (
            <div className="home"> 
                <form onSubmit={this.onSubmitRegisterAccount} className="home__form"> 

                    <div className="home__form-title">Create New Account</div> 

                    <input type='text' 
                        className="home__form-text-input"
                        onChange={(e) => this.onChangeSetInputAccountName(e)} 
                        placeholder="please provide name..." />

                    <input type='submit' 
                        className="home__btn" 
                        value="ask to join" />
                </form>
            </div>      
        );
    }
}  
export default HomePage;