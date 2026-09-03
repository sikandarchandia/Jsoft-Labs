import express from "express";
import cors from "cors";
import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json());
app.use(cors());

const deploymentPath = path.join(__dirname, "deployment.json");
const deployment = JSON.parse(fs.readFileSync(deploymentPath));
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const contract = new ethers.Contract(deployment.address, deployment.abi, provider);
console.log("Contract loaded:", deployment.address);

app.get("/contract/info", async (req, res) => {
  try {
    const total = await contract.totalProperties();
    res.json({
      success: true,
      contract: {
        address: deployment.address,
        network: deployment.network,
        chainId: deployment.chainId,
        deployer: deployment.deployer,
        deployedAt: deployment.deployedAt,
        totalProperties: total.toString(),
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/contract/properties", async (req, res) => {
  try {
    const props = await contract.getAllProperties();
    const formatted = props.map(p => ({
      id: p.id.toString(),
      title: p.title,
      location: p.location,
      priceUSD: p.priceUSD.toString(),
      owner: p.owner,
      isActive: p.isActive,
    }));
    res.json({ success: true, count: formatted.length, properties: formatted });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get("/contract/properties/:id", async (req, res) => {
  try {
    const p = await contract.getProperty(parseInt(req.params.id));
    res.json({
      success: true,
      property: {
        id: p.id.toString(),
        title: p.title,
        location: p.location,
        priceUSD: p.priceUSD.toString(),
        owner: p.owner,
        isActive: p.isActive,
      },
    });
  } catch (err) {
    res.status(404).json({ success: false, message: err.message });
  }
});

app.get("/contract/balance/:address", async (req, res) => {
  try {
    const bal = await provider.getBalance(req.params.address);
    res.json({
      success: true,
      address: req.params.address,
      balanceWei: bal.toString(),
      balanceETH: ethers.formatEther(bal),
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Blockchain API running on http://localhost:${PORT}`);
  console.log(`  GET  /contract/info`);
  console.log(`  GET  /contract/properties`);
  console.log(`  GET  /contract/properties/:id`);
  console.log(`  GET  /contract/balance/:address`);
});
