import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../Controller/userController";

const router = Router();

router.get("/user", getUsers);
router.get("/user/:id", getUser);
router.post("/user", createUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

export default router;
