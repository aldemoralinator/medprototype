pragma solidity ^0.5.0;

contract HerbalMedicine {

    address owner; 

    enum AccountRole { 
        Owner,
        Member
    }

    struct Account {
        address accountAddress;
        string name;
        AccountRole role;
        bool isMember;
        bool isApplied;
    }

    struct Package {
        uint256 key;
        uint256 barcode;
        string name;
        string description;
        uint256 historyKey;
        uint256 transferCount;
        address currentHandler;
        address currentReciever;
    }

    struct Transfer {
        uint256 key;
        address source;
        address destination;
        uint256 time;
    }

    mapping(address => Account) accounts;
    mapping(uint256 => address) allAccountAddresses;
    mapping(uint256 => Package) packages;
    mapping(uint256 => mapping(uint256 => Transfer)) history;
    mapping(uint256 => Transfer) transfers;

    uint256 accountCount;
    uint256 packageCount;
    uint256 historyCount;
    uint256 transferCount;

    modifier onlyGuest {
        require(
            accounts[msg.sender].isMember == false &&
            accounts[msg.sender].isApplied == false, 
            "You are a member or has pending application");
        _;
    }

    modifier onlyMember {
        require(accounts[msg.sender].isMember == true, "You are not a member.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }
    
    modifier onlyPackageHandler( uint256 _packageKey, address _packageReciever ) {
        require( 
            packages[_packageKey].currentHandler == msg.sender && 
            packages[_packageKey].currentHandler != _packageReciever , 
            "You are not the package owner or repeating owner"
        );
        _;
    }
    
    modifier onlyPackageReciever( uint256 _packageKey ) {
        require( 
            packages[_packageKey].currentReciever == msg.sender,
            "You are not the package reciever"
        );
        _;
    }

    constructor() public {
        accountCount++;
        owner = msg.sender;
        accounts[msg.sender] = Account( msg.sender, "Likhait", AccountRole.Owner, true, true); 
        allAccountAddresses[accountCount] = msg.sender;
    }

    function registerAccount(
        string memory _name 
    ) public onlyGuest {
        accountCount++;
        allAccountAddresses[accountCount] = msg.sender;
        accounts[msg.sender] = Account( msg.sender, _name, AccountRole(1), false, true);
    }

    function getAccountCount() public onlyOwner view returns (uint256) {
        return (accountCount);
    }

    function getAccountAddress(uint256 _addressKey) public onlyOwner view returns (
        address accountAddress
    ) {
        return allAccountAddresses[_addressKey];
    }

    function allowAccount(
        address _account
    ) public onlyOwner {
        accounts[_account].isMember = true;
    }

    function removeAccount(
        address _account
    ) public onlyOwner {
        accounts[_account].isMember = false;
    }

    function getAccounts(address _address) public onlyMember view returns (
        address accountAddress,
        string memory name,
        AccountRole role,
        bool isMember
    ) {
        Account memory _account = accounts[_address];
        return (_account.accountAddress, _account.name, _account.role, _account.isMember);
    } 
    
    function getPackageCount() public onlyMember view returns (uint256) {
        return (packageCount);
    }

    function getPackage(uint256 _packageKey) public onlyMember view returns (
        uint256 _key,
        uint256 _barcode,
        string memory _name,
        string memory _description,
        uint256 _historyKey,
        uint256 _transferCount,
        address currentHandler,
        address currentReciever
    ) {
        Package memory _package = packages[_packageKey];
        return (
            _package.key,
            _package.barcode,
            _package.name,
            _package.description,
            _package.historyKey,
            _package.transferCount,
            _package.currentHandler,
            _package.currentReciever
        );
    }

    function getTransfer(
        uint256 _historyKey,
        uint256 _transferKey
    ) public onlyMember view returns (address source, address destination, uint256 _time) {
        Transfer memory _transfer = transfers[history[_historyKey][_transferKey].key];
        return (_transfer.source, _transfer.destination, _transfer.time);
    } 

    function createPackage(
        uint256 _barcode,
        string memory _name,
        string memory _description
    ) public onlyMember {
        historyCount++;
        packageCount++;
        transferCount++;
        packages[packageCount] = Package(packageCount, _barcode, _name, _description, historyCount, 1, msg.sender, address(0));
        transfers[transferCount] = Transfer( transferCount, msg.sender, msg.sender, block.timestamp );
        history[packages[packageCount].historyKey][packages[packageCount].transferCount] = transfers[transferCount];
    }
    
    function sendPackage( uint256 _packageKey, address _packageReciever ) public onlyMember onlyPackageHandler( _packageKey, _packageReciever ) {
        packages[_packageKey].currentReciever = _packageReciever;
    }

    function recievePackage( uint256 _packageKey ) public onlyPackageReciever( _packageKey ) {
        transferCount++;
        packages[_packageKey].transferCount++;
        packages[_packageKey].currentHandler = msg.sender;
        packages[_packageKey].currentReciever = address(0);
        transfers[transferCount] = Transfer(
            transferCount,
            history[packages[_packageKey].historyKey][packages[_packageKey].transferCount - 1].destination,
            msg.sender,
            block.timestamp
        );
        history[packages[_packageKey].historyKey][packages[_packageKey].transferCount] = transfers[transferCount];
    } 
}