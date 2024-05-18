import dotenv from "dotenv";
import { app } from "./app";
import { logger } from "./error-logger";

dotenv.config();

try {
  const http_port: number = process.env.HTTP_PORT as unknown as number || 5001;

  app.listen(http_port, () => {
    console.clear();
    logger.info(`⚡️Server is running at http://localhost:${http_port}`);
    console.log(
      "______________________________________________________________________________________________________"
    );
  });
} catch (error: any) {
  logger.error(`"${error.message}"`);
}
