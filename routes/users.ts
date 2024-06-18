import express from "express";
import {
  getUserSignup,
  postUserSignup,
  postUserLogin,
} from "../controllers/users";

const router = express.Router();

router.post("/signup", postUserSignup);
router.get("/signup", getUserSignup);
router.post("/login", postUserLogin);

export default router;
