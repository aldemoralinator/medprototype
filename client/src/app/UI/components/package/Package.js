import React, { Component } from "react"; 
import './Package.css';

export class Package extends Component {

  state = {
    inputBarcode: "",
    inputName: "",
    inputDescription: "",
    inputSendAddress: "",
    inputSendPackage: null,
    packageCount: 0,
    packages: [
      {
        _key: 123,
        _barcode: 12312312,
        _name: "asdf",
        _description: "asdf",
        _historyKey: 1,
        _transferCount: 1,
        currentHandler: "0xCE48407f70b4C6DdF00c6d352dAE45e55D0292eC",
        currentReciever: 12312,
        history: [
          {
            key: 123,
            source: "0xCE48407f70b4C6DdF00c6d352dAE45e55D0292eC",
            destination: "0xCE48407f70b4C6DdF00c6d352dAE45e55D0292eC",
            sourceObj: {
              accountAddress: "0xCE48407f70b4C6DdF00c6d352dAE45e55D0292eC",
              name: "Aldem"
            },
            destinationObj: {
              accountAddress: "0xCE48407f70b4C6DdF00c6d352dAE45e55D0292eC",
              name: "Aldeasdfm"
            },
            _time: 1610017598
          },
        ]
      }
    ]
  } 

  componentDidMount = async () => {   
    this.getPackages();
  };  

  getPackages = async () => {
    const { web3, web3Accounts, currentAccount, contract } = this.props;

    let _packageCount = 0;
    let packages = [];

    await contract.methods.getPackageCount().call().then(
      count => _packageCount = count
    ); 

    for (let i = 1; i <= _packageCount; i++) {
      let _package = null;
      await contract.methods.getPackage(i).call().then(
        __package => _package = __package
      ); 
      _package.history = [];
      console.log(_package);
      for (let j = 1; j <= _package._transferCount; j++) {
        await contract.methods.getTransfer(_package._historyKey, j).call().then(
          async _transfer => {  
            _package.history[j] = _transfer
            await contract.methods.getAccounts(_transfer.source).call().then(
              _account => _package.history[j].sourceObj = _account
            ); 
            await contract.methods.getAccounts(_transfer.destination).call().then(
              _account => _package.history[j].destinationObj = _account
            ); 
          }
        );  
      }
      packages.push(_package);
    }
    this.setState({ packages });

  }

  temp = async () => {
    const { contract, web3Accounts } = this.props;
    await contract.methods
      .createPackage(6666, "Marijuana", "The damn good herb.")
      .send({ from: web3Accounts[0] })
  }

  getTransfer = async () => {
    // TODO: get transfer by key attach to history
  }

  createPackage = async (barcode, name, description) => {
     
    if ( barcode === "" || name === "" || description === "" ) {
      alert("barcode, name, and description must not be empty!");
      return;
    }
      
    const { contract, web3Accounts } = this.props;
    await contract.methods
      .createPackage(barcode, name, description)
      .send({ from: web3Accounts[0] })

    this.getPackages();
  }

  sendPackage = async (packageKey, packageReciever) => {
    try {
      const { contract, web3Accounts } = this.props;
      await contract.methods
        .sendPackage(packageKey, packageReciever)
        .send({ from: web3Accounts[0] })
  
      this.getPackages();
    } catch(e) {
      alert("invalid address")
      console.error(e.code);
    }
    
  }

  recievePackage = async (packageKey) => {
    const { contract, web3Accounts } = this.props;
    await contract.methods
      .recievePackage(packageKey)
      .send({ from: web3Accounts[0] })

    this.getPackages();
  }

  onSubmitCreatePackage = async (e) => {
    e.preventDefault();  
    const { inputBarcode, inputName, inputDescription } = this.state;
    this.createPackage(inputBarcode, inputName, inputDescription)
    console.log(inputBarcode, inputName, inputDescription );
  }

  onSubmitSendPackage = async (e) => {
    e.preventDefault();  
    const { inputSendAddress, inputSendPackage } = this.state;
    this.sendPackage(inputSendPackage, inputSendAddress);
  }
 

  render() { 

    const { packages } = this.state; 
    const { web3Accounts } = this.props;

    return (
      <div className="pkg"> 
        <div className="pkg__title">Packages</div> 
        <div className="pkg__create">
          <div className="pkg__create__title">Create New Package</div> 
          <form onSubmit={this.onSubmitCreatePackage} className="pkg__create__form">   

            <div className="pkg__create__form__group">
              <div className="pkg__create__form__label">
                Barcode: 
              </div>
              <input type='number' 
                className="pkg__create__form__text-input"
                onChange={(e) => this.setState({ inputBarcode: e.target.value })} />

            </div>

            <div className="pkg__create__form__group">
              <div className="pkg__create__form__label">
                Name: 
              </div>
              <input type='text' 
                className="pkg__create__form__text-input"
                onChange={(e) => this.setState({ inputName: e.target.value })} 
                placeholder="name..." />

            </div>

            <div className="pkg__create__form__group">
              <div className="pkg__create__form__label">
                Description: 
              </div>
              <input type='text' 
                className="pkg__create__form__text-input"
                onChange={(e) => this.setState({ inputDescription: e.target.value })} 
                placeholder="description..." />

            </div> 
            <input type='submit' 
              className="pkg__create__form__submit" 
              value="create new package" />

          </form>
        </div>

        <div className="pkg__create__title">Package Transactions</div> 
        <div className="pkg__list">
          {packages.map( (_package, index ) => 
            <div key={index} className="pkg__item">
              <div className="pkg__item__attribute" >
                <span>id:</span>
                {_package._key}
              </div>
              <div className="pkg__item__attribute">
                <span>Barcode:</span>
                {_package._barcode}
              </div> 
              <div className="pkg__item__attribute">
                <span>Name:</span>
                {_package._name}
              </div> 
              <div className="pkg__item__attribute">
                <span>Description:</span>
                {_package._description}
              </div>  
              { _package.currentHandler === web3Accounts[0] ? 
                <div className="pkg__item__attribute">
                  <span>Send to:</span>
                  { this.state.inputSendPackage == _package._key ? 
                    <form onSubmit={this.onSubmitSendPackage} 
                      className="pkg__item__attribute__send__form"
                    >
                      <input type='text' 
                        className="pkg__create__form__text-input"
                        onChange={(e) => this.setState({ 
                          inputSendAddress: e.target.value,
                          inputSendPackage: _package._key
                        })} 
                        placeholder="account address..." />

                      <input type='submit' 
                        className="pkg__item__attribute__send__form__submit" 
                        value="send" /> 
                    </form>  : 
                    <div className="open-btn"
                      onClick={() => this.setState({ 
                        inputSendPackage: _package._key 
                      })}
                    >
                      input address &#9656;
                    </div>
                  }
                    
                   
                </div> :
                <span></span>
              } 
              { _package.currentReciever === web3Accounts[0] ? 
                <div className="pkg__item__attribute">
                  <span>Recieve:</span>
                  <div className="pkg__item__attribute__btn"
                    onClick={()=>this.recievePackage(_package._key)}
                  >
                    recieve
                  </div> 
                </div> :
                <span></span>
              }
              <div className="pkg__item__attribute">
                Package History:
              </div>
              <div className="pkg__item__history">
                {_package.history.map( (transfer, index) => 
                  <div key={index} className="pkg__item__history__transfer">
                    Source <br />
                    <div className="pkg__item__history__transfer__attribute">
                      <div className="pkg__item__history__transfer__address"
                        title={transfer.sourceObj.accountAddress}
                      >
                        <span>Address: </span>{transfer.sourceObj.accountAddress}
                      </div>
                      <div className="pkg__item__history__transfer__name" 
                        title={transfer.sourceObj.name} 
                      >
                        <span>Name: </span>{transfer.sourceObj.name}
                      </div>
                    </div>
                    Destination <br />
                    <div className="pkg__item__history__transfer__attribute">
                      <div className="pkg__item__history__transfer__address"
                        title={transfer.destinationObj.accountAddress}
                      >
                        <span>Address: </span>{transfer.destinationObj.accountAddress}
                      </div>
                      <div className="pkg__item__history__transfer__name" 
                        title={transfer.destinationObj.name} 
                      >
                        <span>Name: </span>{transfer.destinationObj.name}
                      </div>
                    </div>
                    <div className="pkg__item__history__date">
                      <span>Date: </span>
                      { new Date(transfer._time*1000).toUTCString() }
                    </div>
                  </div> 
                )}
              </div> 
            </div>
          )}
      </div> 
      </div>
    );
  }
}  
export default Package;