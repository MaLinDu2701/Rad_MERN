import express from "express";

const router = express();

import {
  createForum,
  viewForums,
  viewForum,
  editUser,
  deleteUser
} from "../controller/lectrureController.js";

router.post("/lecture/forum", createForum);
router.get("/lecture/forums", viewForums);
router.get("/lecture/forum/:id", viewForum);
router.put("/lecture/forum/:id", editUser);
router.delete("/lecture/forum/:id", deleteUser);

export { router };
