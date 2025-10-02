import express from "express";
import cors from "cors";

// express app
const app = express();

// global middleware
app.use(express.json());
app.use(cors());

export default app;
