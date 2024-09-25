import express from "express";
import connectDB from "./configs/db.mjs";
import { PORT } from "./configs/config.mjs";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";

const app = express();
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use(router);

app.listen(PORT, () => {
  try {
    console.log(`server running on port ${PORT}`);
  } catch (error) {
    process.exit(1);
  }
});
