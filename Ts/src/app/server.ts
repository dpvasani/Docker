// DO NOT import 'app' from express
import express from "express";

// Create app instance from express()
const app = express();

// Correct handler function
app.get("/", (_req, res) => {
  res.json({ message: "Hello from TypeScript Server" });
});

// Export the app
export default app;
