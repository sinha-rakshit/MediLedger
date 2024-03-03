const hre = require('hardhat');

async function main() {
    const MediLedger = await hre.ethers.getContractFactory("MediLedger")
    const mediLedger = await MediLedger.deploy();

    await mediLedger.deployed();

    console.log("Contract deployed to:", mediLedger.address);
}

main()
     .then(() => process.exit(0))
     .catch((error) => {
        console.log(error);
        process.exit(1);
     });