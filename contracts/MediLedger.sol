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
        string indexed pid,
        address indexed walletid,
        address contractAddress,
        string name,
        string gender,
        string allergies,
        uint height,
        uint weight,
        string bloodgrp
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
    address public wid;
    constructor() {
        admin = msg.sender;
        accounts = 0x7814c6fd323a2EB88D257289682E3c2c8E945C82;
    }

    function addPatient(
        string memory _name,
        string memory _fid,
        string memory _gender,
        string memory _allergies,
        string memory _bloodgrp,
        uint _height,
        uint _weight,
        address payable _walletid
    ) public {
        require(msg.sender == admin);
        Patient p = new Patient(
            _name,
            _fid,
            _gender,
            _allergies,
            _height,
            _weight,
            _bloodgrp,
            accounts,
            admin,
            payable(_walletid)
        );

        deployedPatients.push(address(p));

        emit allPatient(
            _fid,
            _walletid,
            address(p),
            _name,
            _gender,
            _allergies,
            _height,
            _weight,
            _bloodgrp
        );
    }

    function getDeployedPatients() public view returns (address[] memory) {
        return deployedPatients;
    }

    function addDoctor(
        string memory name,
        string memory did,
        address walletid
    ) public {
        require(msg.sender == admin);
        Doctor d = new Doctor(name, did, walletid);
        allDoctorsWallets.push(walletid);
        emit allDoctor(did, name, address(d), walletid);
    }
}

contract Patient is allDoctors {
    event allBills(uint timestamp, string hash);
    event refunds(uint timestamp, uint amount);

    string public name;
    string public pid;
    string public gender;
    string public allergies;
    uint public height;
    uint public weight;
    string public bloodgrp;

    address public admin;
    string[] public pendingBills;
    string[] public passedBills;
    address public accounts;
    uint public pendingRefund;
    address payable public walletid;

    constructor(
        string memory _name,
        string memory _fid,
        string memory _gender,
        string memory _allergies,
        uint _height,
        uint _weight,
        string memory _bloodgrp,
        address _accounts,
        address _admin,
        address payable _walletid
    ) {
        name = _name;
        pid = _fid;
        gender = _gender;
        allergies = _allergies;
        height = _height;
        weight = _weight;
        bloodgrp = _bloodgrp;
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
