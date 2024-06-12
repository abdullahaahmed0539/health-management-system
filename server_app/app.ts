import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { AuthRouter, authRoute } from "./routes/auth";
import { PatientRouter, patientRoute } from "./routes/patients";
import { UserRouter, userRoute } from "./routes/users";

dotenv.config();

const app: Express = express();
const base_url: string = process.env.BASE_URL as string;

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));

app.use(`${base_url}/${authRoute}`, AuthRouter);
app.use(`${base_url}/${patientRoute}`, PatientRouter);
app.use(`${base_url}/${userRoute}`, UserRouter);

// app.get("*", (req, res) => {});

export { app };
