"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchPost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const db_js_1 = __importDefault(require("../db/db.js"));
const getPosts = async (req, res) => {
    let page = Number(req.query.page) || 1;
    let limit = Number(req.query.limit) || 10;
    if (page <= 0) {
        page = 1;
    }
    if (limit <= 0 || limit > 100) {
        limit = 10;
    }
    const posts = await db_js_1.default.post.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
            comment: {
                include: {
                    user: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
        orderBy: {
            id: "desc",
        },
    });
    const totalPosts = await db_js_1.default.post.count();
    const totalPages = Math.ceil(totalPosts / limit);
    const pagination = {
        page,
        limit,
        totalPosts,
        totalPages,
    };
    res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: posts,
        pagination,
    });
};
exports.getPosts = getPosts;
const getPost = async (req, res) => {
    const postId = req.params.id;
    const post = await db_js_1.default.post.findUnique({
        where: {
            id: Number(postId),
        },
    });
    res.status(200).json({
        success: true,
        message: "Post fetched successfully",
        data: post,
    });
};
exports.getPost = getPost;
const createPost = async (req, res) => {
    const { user_id, title, description } = req.body;
    const post = await db_js_1.default.post.create({
        data: {
            user_id,
            title,
            description,
        },
    });
    res.status(201).json({
        success: true,
        message: "Post created successfully",
        data: post,
    });
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { user_id, title, description } = req.body;
    const post = await db_js_1.default.post.update({
        where: {
            id: Number(postId),
        },
        data: {
            user_id,
            title,
            description,
        },
    });
    res.status(200).json({
        success: true,
        message: "Post updated successfully",
        data: post,
    });
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    const postId = req.params.id;
    const user = await db_js_1.default.post.delete({
        where: {
            id: Number(postId),
        },
    });
    res.status(200).json({
        success: true,
        message: "Post deleted successfully",
    });
};
exports.deletePost = deletePost;
const searchPost = async (req, res) => {
    const query = req.query.q;
    const posts = await db_js_1.default.post.findMany({
        where: {
            description: {
                search: query,
            },
        },
    });
    res.status(200).json({
        success: true,
        message: "Posts fetched successfully",
        data: posts,
    });
};
exports.searchPost = searchPost;
