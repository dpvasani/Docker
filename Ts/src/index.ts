// src/index.ts

import http from "http";
import app from "./app/server";

const PORT = process.env.PORT ? +process.env.PORT : 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
server.on("error", (error) => {
  console.error("❌ Server error:", error);
});