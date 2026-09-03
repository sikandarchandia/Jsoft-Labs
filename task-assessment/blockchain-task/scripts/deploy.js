import { network } from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const { ethers } = await network.connect();
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const PropertyRegistry = await ethers.getContractFactory("PropertyRegistry");
  const contract = await PropertyRegistry.deploy();
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("PropertyRegistry deployed to:", address);

  await contract.listProperty("Luxury Downtown Apartment", "Miami, FL", 850000);
  await contract.listProperty("Modern Tech District Complex", "Austin, TX", 1200000);
  await contract.listProperty("Waterfront Commercial Space", "Seattle, WA", 2100000);
  console.log("Seeded 3 sample properties");

  const deployment = {
    address,
    network: "localhost",
    chainId: 31337,
    deployer: deployer.address,
    deployedAt: new Date().toISOString(),
    abi: JSON.parse(contract.interface.formatJson()),
  };

  fs.writeFileSync(
    path.join(__dirname, "../api/deployment.json"),
    JSON.stringify(deployment, null, 2)
  );
  console.log("Deployment info saved to api/deployment.json");
}

main().catch((err) => { console.error(err); process.exit(1); });
