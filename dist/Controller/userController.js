"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const db_js_1 = __importDefault(require("../db/db.js"));
const getUsers = async (req, res) => {
    const users = await db_js_1.default.user.findMany();
    res.status(200).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
    });
};
exports.getUsers = getUsers;
const getUser = async (req, res) => {
    const userId = req.params.id;
    const user = await db_js_1.default.user.findUnique({
        where: {
            id: Number(userId),
        },
    });
    res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user,
    });
};
exports.getUser = getUser;
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const findUser = await db_js_1.default.user.findUnique({
        where: {
            email: email,
        },
    });
    if (findUser) {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }
    const user = await db_js_1.default.user.create({
        data: {
            name: name,
            email: email,
            password: password,
        },
    });
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
    });
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const user = await db_js_1.default.user.update({
        where: {
            id: Number(userId),
        },
        data: {
            name,
            email,
            password,
        },
    });
    res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
    });
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await db_js_1.default.user.delete({
        where: {
            id: Number(userId),
        },
    });
    res.status(200).json({
        success: true,
        message: "User deleted successfully",
    });
};
exports.deleteUser = deleteUser;
