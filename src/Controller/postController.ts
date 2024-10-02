import prisma from "../db/db.js";
import { Request, Response } from "express";

export const getPosts = async (req: Request, res: Response) => {
  let page = Number(req.query.page) || 1;
  let limit = Number(req.query.limit) || 10;

  if (page <= 0) {
    page = 1;
  }

  if (limit <= 0 || limit > 100) {
    limit = 10;
  }

  const posts = await prisma.post.findMany({
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

  const totalPosts = await prisma.post.count();
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

export const getPost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const post = await prisma.post.findUnique({
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

export const createPost = async (req: Request, res: Response) => {
  const { user_id, title, description } = req.body;

  const post = await prisma.post.create({
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

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;

  const { user_id, title, description } = req.body;

  const post = await prisma.post.update({
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

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;

  const user = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });
  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
  });
};

export const searchPost = async (req: Request, res: Response) => {
  const query = req.query.q as string;

  const posts = await prisma.post.findMany({
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
