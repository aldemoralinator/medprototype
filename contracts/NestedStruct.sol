pragma solidity ^0.5.0;

contract NestedStruct {

    address owner;

    Account public ownerAccount;

    enum AccountRole {
        Producer,
        WholeSaler,
        Retailer,
        Owner
    }

    struct Account {
        address accountAddress;
        string name;
        AccountRole role;
        bool isApproved;
    }

    struct Package {
        uint256 key;
        uint256 barcode;
        string name;
        string description;
        uint256 historyKey;
        uint256 transferCount;
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

    function getAccountCount() public onlyOwner view returns (uint256) {
        return (accountCount);
    }

    function getAccounts(address _address) public onlyApproved view returns (
        address accountAddress,
        string memory name,
        AccountRole role,
        bool isApproved
    ) {
        Account memory _account = accounts[_address];
        return (_account.accountAddress, _account.name, _account.role, _account.isApproved);
    }

    function getAllAccountAddresses(uint256 _addressKey) public onlyOwner view returns (
        address accountAddress
    ) {
        return allAccountAddresses[_addressKey];
    }

    function getPackages(uint256 _packageKey) public onlyApproved view returns (
        uint256 _key,
        uint256 _barcode,
        string memory _name,
        string memory _description,
        uint256 _historyKey,
        uint256 _transferCount
    ) {
        Package memory _package = packages[_packageKey];
        return (
            _package.key,
            _package.barcode,
            _package.name,
            _package.description,
            _package.historyKey,
            _package.transferCount
        );
    }

    modifier onlyApproved {
        require(accounts[msg.sender].isApproved, "You are not registered.");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    constructor() public {
        accountCount++;
        owner = msg.sender;
        accounts[msg.sender] = Account( msg.sender, "Likhait", AccountRole.Owner, true);
        ownerAccount = accounts[msg.sender];
        allAccountAddresses[accountCount] = msg.sender;
    }

    function registerAccount(
        string memory _name,
        uint8 _role
    ) public {
        accountCount++;
        allAccountAddresses[accountCount] = msg.sender;
        accounts[msg.sender] = Account( msg.sender, _name, AccountRole(_role), false);
    }

    function allowAccount(
        address _account
    ) public onlyOwner {
        accounts[_account].isApproved = true;
    }

    function addPackage(
        uint256 _barcode,
        string memory _name,
        string memory _description
    ) public onlyApproved {
        historyCount++;
        packageCount++;
        transferCount++;
        packages[packageCount] = Package(packageCount, _barcode, _name, _description, historyCount, 1);
        transfers[transferCount] = Transfer( transferCount, msg.sender, msg.sender, block.timestamp );
        history[packages[packageCount].historyKey][packages[packageCount].transferCount] = transfers[transferCount];
    }

    function recievePackage( uint256 _packageKey ) public onlyApproved {
        transferCount++;
        packages[_packageKey].transferCount++;
        transfers[transferCount] = Transfer(
            transferCount,
            history[packages[_packageKey].historyKey][packages[_packageKey].transferCount - 1].destination,
            msg.sender,
            block.timestamp
        );
        history[packages[_packageKey].historyKey][packages[_packageKey].transferCount] = transfers[transferCount];
    }

    function getTransfer(
        uint256 _historyKey,
        uint256 _transferKey
    ) public onlyApproved view returns (address source, address destination, uint256 _time) {
        Transfer memory _transfer = transfers[history[_historyKey][_transferKey].key];
        return (_transfer.source, _transfer.destination, _transfer.time);
    }
    
}