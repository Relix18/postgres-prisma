"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getComment = exports.getComments = void 0;
const db_js_1 = __importDefault(require("../db/db.js"));
const getComments = async (req, res) => {
    const comments = await db_js_1.default.comment.findMany({});
    res.status(200).json({
        success: true,
        message: "Comments fetched successfully",
        data: comments,
    });
};
exports.getComments = getComments;
const getComment = async (req, res) => {
    const commentId = req.params.id;
    const comment = await db_js_1.default.comment.findUnique({
        where: {
            id: commentId,
        },
    });
    res.status(200).json({
        success: true,
        message: "Comment fetched successfully",
        data: comment,
    });
};
exports.getComment = getComment;
const createComment = async (req, res) => {
    const { user_id, post_id, comment } = req.body;
    const comments = await db_js_1.default.comment.create({
        data: {
            user_id,
            post_id,
            comment,
        },
    });
    await db_js_1.default.post.update({
        where: {
            id: post_id,
        },
        data: {
            comment_count: {
                increment: 1,
            },
        },
    });
    res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: comments,
    });
};
exports.createComment = createComment;
const updateComment = async (req, res) => {
    const commentId = req.params.id;
    const { user_id, post_id, comment } = req.body;
    const comments = await db_js_1.default.comment.update({
        where: {
            id: commentId,
        },
        data: {
            user_id,
            post_id,
            comment,
        },
    });
    res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        data: comments,
    });
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    // await prisma.post.update({
    //   where: {
    //     id: Number(commentId),
    //   },
    //   data: {
    //     comment_count: {
    //       decrement: 1,
    //     },
    //   },
    // });
    const comment = await db_js_1.default.comment.delete({
        where: {
            id: commentId,
        },
    });
    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
};
exports.deleteComment = deleteComment;
