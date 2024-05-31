import dotenv from "dotenv";
import { app } from "./app";
import { logger } from "./error-logger";
import mongoose from "mongoose";

dotenv.config();

try {
  const connectionString: string = process.env.MONGODB_CONNECTION_STRING as string;

  mongoose
    .connect(connectionString)
    .then(() => {
      logger.info("Database connection successful.");
    })
    .catch((err: any) => {
      logger.error(
        `Database connection unsuccessful. ERROR LOG: ${err}`
      );
    });


  const http_port: number = process.env.HTTP_PORT as unknown as number || 5001;


  app.listen(http_port, () => {
    // console.clear();
    logger.info(`⚡️Server is running at http://localhost:${http_port}`);
    logger.info("Connecting to database...");
    
  });
} catch (error: any) {
  logger.error(`"${error.message}"`);
}
