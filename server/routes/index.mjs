import { Router } from "express";
import cors from "cors";
import userRouter from "./user.mjs";
import clientRouter from "./client.mjs";

const router = Router();

router.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

router.use(userRouter);
router.use(clientRouter);

export default router;
