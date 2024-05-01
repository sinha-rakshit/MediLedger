// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract MediLedger {
    event allPatient(
        uint indexed pid,
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
        uint indexed did,
        string name,
        address contractAddress,
        address daddress
    );

    address public admin;
    address public accounts;

    constructor() {
        admin = msg.sender;
        accounts = 0xDFfaE6095D941691eD0f616cEB0b5d2C1C3357FD;
    }

    function addPatient(
        string memory _name,
        uint _fid,
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

    function addDoctor(string memory name, uint did, address walletid) public {
        require(msg.sender == admin, "You're not authorized");
        Doctor d = new Doctor(name, did, walletid);
        emit allDoctor(did, name, address(d), walletid);
    }
}

contract Patient {
    event allBills(
        address indexed Doctor,
        uint indexed amount,
        uint indexed timestamp,
        string hash
    );
    event refunds(uint indexed amount, uint indexed timestamp);

    string public name;
    uint public pid;
    string public gender;
    string public allergies;
    uint public height;
    uint public weight;
    string public bloodgrp;

    address public admin;
    address[] public allDoctorsWallets;

    address public accounts;
    uint public pendingRefund;
    address payable public walletid;

    constructor(
        string memory _name,
        uint _fid,
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
        allDoctorsWallets.push(0xE3d5A0eE33Bc9E9A047AC9d5d4418379E2e7C009);
    }

    function passBill() public payable {
        require(msg.sender == accounts, "You're not authorized");
        walletid.transfer(msg.value);
        uint temp = pendingRefund;
        pendingRefund = 0;
        emit refunds(temp, block.timestamp);
    }

    function addBill(string memory _hash, uint amount) public payable {
        require(isDoctor(msg.sender) == true, "You're not authorized");
        pendingRefund += amount;
        emit allBills(msg.sender, amount, block.timestamp, _hash);
    }

    function isDoctor(address docadd) public view returns (bool) {
        for (uint i = 0; i < allDoctorsWallets.length; i++) {
            if (allDoctorsWallets[i] == docadd) return true;
        }
        return false;
    }
}

contract Doctor {
    string public name;
    uint did;
    address public walletid;
    constructor(string memory _name, uint _did, address _walletid) {
        name = _name;
        did = _did;
        walletid = _walletid;
    }
}
