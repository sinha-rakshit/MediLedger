// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract allDoctors {
    address[] public allDoctorsWallets;

    function addDoctorWallet(address wallet) external {
        allDoctorsWallets.push(wallet);
    }
}

contract MediLedger is allDoctors {
    event allPatient(
        string indexed fid,
        string name,
        address contractAddress,
        address paddress
    );
    event allDoctor(
        string indexed did,
        string name,
        address contractAddress,
        address daddress
    );
    address public admin;
    address public accounts;
    address[] public deployedPatients;

    constructor() {
        admin = msg.sender;
        accounts = 0xdD870fA1b7C4700F2BD7f44238821C26f7392148;
    }

    function addPatient(
        string memory _name,
        string memory _fid,
        string memory walletid
    ) public {
        require(msg.sender == admin, "youre not admin");
        address wid = address(bytes20(bytes(walletid)));
        Patient p = new Patient(_name, _fid, accounts, admin, payable(wid));
        deployedPatients.push(address(p));
        emit allPatient(_fid, _name, address(p), wid);
    }

    function addDoctor(
        string memory name,
        string memory did,
        string memory walletid
    ) public {
        require(msg.sender == admin);
        address wid = address(bytes20(bytes(walletid)));
        Doctor d = new Doctor(name, did, wid);
        allDoctorsWallets.push(wid);
        emit allDoctor(did, name, address(d), wid);
    }
}

contract Patient is allDoctors {
    event allBills(uint timestamp, string hash);
    event refunds(uint timestamp, uint amount);
    string public name;
    string public pid;
    address public admin;
    string[] public pendingBills;
    string[] public passedBills;
    address public accounts;
    uint public pendingRefund;
    address payable public walletid;
    constructor(
        string memory _name,
        string memory _fid,
        address _accounts,
        address _admin,
        address payable _walletid
    ) {
        name = _name;
        pid = _fid;
        accounts = _accounts;
        admin = _admin;
        walletid = _walletid;
    }

    function passBill() public payable {
        require(msg.sender == accounts);
        walletid.transfer(pendingRefund);
        for (uint i = 0; i < pendingBills.length; i++) {
            passedBills.push(pendingBills[i]);
        }
        pendingBills = new string[](0);
        emit refunds(block.timestamp, pendingRefund);
        pendingRefund = 0;
    }

    function addBill(string memory _hash, uint amount) public {
        require(isDoctor(msg.sender) == true);
        pendingBills.push(_hash);
        pendingRefund += amount;
        emit allBills(block.timestamp, _hash);
    }

    function isDoctor(address docadd) public view returns (bool) {
        for (uint i = 0; i < allDoctorsWallets.length; i++) {
            if (allDoctorsWallets[i] == docadd) return true;
        }
        return false;
    }

    function getPendingBills() public view returns (string[] memory) {
        return pendingBills;
    }

    function getPassedBills() public view returns (string[] memory) {
        return passedBills;
    }

    function getPendingRefund() public view returns (uint) {
        return pendingRefund;
    }
}

contract Doctor {
    string public name;
    string public did;
    address public walletid;
    constructor(string memory _name, string memory _did, address _walletid) {
        name = _name;
        did = _did;
        walletid = _walletid;
    }
}
