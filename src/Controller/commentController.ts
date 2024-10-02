import prisma from "../db/db.js";
import { Request, Response } from "express";

export const getComments = async (req: Request, res: Response) => {
  const comments = await prisma.comment.findMany({});
  res.status(200).json({
    success: true,
    message: "Comments fetched successfully",
    data: comments,
  });
};

export const getComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const comment = await prisma.comment.findUnique({
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

export const createComment = async (req: Request, res: Response) => {
  const { user_id, post_id, comment } = req.body;

  const comments = await prisma.comment.create({
    data: {
      user_id,
      post_id,
      comment,
    },
  });

  await prisma.post.update({
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

export const updateComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;

  const { user_id, post_id, comment } = req.body;

  const comments = await prisma.comment.update({
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

export const deleteComment = async (req: Request, res: Response) => {
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

  const comment = await prisma.comment.delete({
    where: {
      id: commentId,
    },
  });

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
};
