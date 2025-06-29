"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// DO NOT import 'app' from express
const express_1 = __importDefault(require("express"));
// Create app instance from express()
const app = (0, express_1.default)();
// Correct handler function
app.get("/", (_req, res) => {
    res.json({ message: "Hello from TypeScript Server" });
});
// Export the app
exports.default = app;
