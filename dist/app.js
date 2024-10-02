"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/v1", userRoutes_1.default);
exports.app.get("/", (req, res) => {
    res.send("Hello");
});
exports.app.get("*", (req, res) => {
    res.send("404 page not found");
});
