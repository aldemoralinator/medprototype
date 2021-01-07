import React, { Component } from "react"; 
import './Package.css';

export class Package extends Component {

  state = {
    packages: [
      {
        _key: 123,
        _barcode: 12312312,
        _name: "asdf",
        _description: "asdf",
        _historyKey: 1,
        _transferCount: 1,
        currentHandler: 0x12065A6bB535d70C9303C48Df5BBDFEa1894f8E9,
        currentReciever: 12312,
        history: [
          {
            key: 123,
            source: 0x12065A6bB535d70C9303C48Df5BBDFEa1894f8E9,
            destination: 0x12065A6bB535d70C9303C48Df5BBDFEa1894f8E9,
            _time: 1610017598
          }
        ]
      }
    ]
  } 

  componentDidMount = async () => {  
  };  

  render() { 

    const { packages } = this.state; 
    const { web3Accounts } = this.props;

    return (
      <div className="pkg"> 
        <div className="pkg__title">Packages</div> 
        <div className="pkg__create">Create</div>
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
              { _package.currentHandler == web3Accounts[0] ? 
                <div className="pkg__item__attribute">
                  <span>Send to:</span>
                  <div className="pkg__item__attribute__btn"
                    onClick={()=>{}}
                  >
                    send
                  </div> 
                </div> :
                <span></span>
              } 
              { false ? 
                <div className="pkg__item__attribute">
                  <span>Recieve:</span>
                  <div className="pkg__item__attribute__btn"
                    onClick={()=>{}}
                  >
                    recieve
                  </div> 
                </div> :
                <span></span>
              }
              {_package.history.map( (transfer, index) =>
                <div key={index} className="pkg__item__history">
                  <div className="pkg__item__history__source">
                    {transfer.source}
                  </div>
                  <div className="pkg__item__history__destination">
                    {transfer.destination}
                  </div>
                  <div className="pkg__item__history__date">
                    {transfer._time}
                  </div>
                </div>
              )}

            </div>
          )}
      </div> 
      </div>
    );
  }
}  
export default Package;