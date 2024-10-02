import prisma from "../db/db.js";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.status(200).json({
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await prisma.user.findUnique({
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

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const findUser = await prisma.user.findUnique({
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

  const user = await prisma.user.create({
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

export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const { name, email, password } = req.body;

  const user = await prisma.user.update({
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

export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  const user = await prisma.user.delete({
    where: {
      id: Number(userId),
    },
  });
  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};
