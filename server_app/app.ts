import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";


dotenv.config();

const app: Express = express();
const base_url: string = process.env.BASE_URL as string;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));


// app.use(`${base_url}/${EmailController.route}`, emailRouter);

// app.get("*", (req, res) => {});

export { app };
