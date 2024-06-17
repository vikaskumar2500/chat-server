import express from "express";
import appRoutes from "./routes/app";
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(appRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
