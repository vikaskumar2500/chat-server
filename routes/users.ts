import express from "express";
import { getUserSignup, postUserSignup } from "../controllers/users";

const router = express.Router();

router.post("/signup", postUserSignup);
router.get("/signup", getUserSignup);

export default router;
