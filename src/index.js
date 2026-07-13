import dns from "dns";
import dotenv from "dotenv";
import connectDb from "./db/index.js";

// Set DNS servers to resolve MongoDB SRV records (bypassing ISP/local DNS restrictions)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({
  path: "./.env",
});

connectDb();

