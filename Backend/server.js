const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");
const http = require("http");

const app = require("./app");
const { initSocket } = require("./socket/socket");
require("./queue/worker");

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error(err));

const port = process.env.PORT || 8000;

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

// Start HTTP server
server.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});
