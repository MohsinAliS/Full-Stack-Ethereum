const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log(
    "Deploying contracts with the account:",
    deployer.address
  );

  const USDC = await hre.ethers.getContractFactory("USDC");
  const greeter = await USDC.deploy();
  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);

}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });