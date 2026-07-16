import dns from "dns";
import dotenv from "dotenv";
import connectDb from "./db/index.js";
import express from "express";

const app = express();

// Set DNS servers to resolve MongoDB SRV records (bypassing ISP/local DNS restrictions)
dns.setServers(["8.8.8.8", "1.1.1.1"]);

dotenv.config({
  path: "./.env",
});

connectDb()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at Port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB CONNECTION FAILED!!! ", error);
  });

  
