import dotenv from "dotenv";
import { app } from "./app";
import { logger } from "./error-logger";
import mongoose from "mongoose";
import User from "./lib/models/user";
import { generate } from "password-hash";
const fs = require("fs");

var https = require("https");


dotenv.config();

try {
  const connectionString: string = process.env.MONGODB_CONNECTION_STRING as string;

  mongoose
    .connect(connectionString)
    .then(async () => {
      logger.info("Database connection successful.");
      const user = await User.findOne({ email: 'abdullah@gmail.com' });
      if (!user) {
        let newAdminUser = new User({
          firstName: process.env.ADMIN_FIRST_NAME,
          lastName: process.env.ADMIN_LAST_NAME,
          email: process.env.ADMIN_EMAIL,
        });
        newAdminUser.hashedPassword = generate(process.env.ADMIN_PASSWORD as string);
        newAdminUser.role = "sysAdmin";
        await newAdminUser.save();
        logger.info('Admin created.')
      }

    })
    .catch((err: any) => {
      logger.error(
        `Database connection unsuccessful. ERROR LOG: ${err}`
      );
    });


  const http_port: number = process.env.HTTP_PORT as unknown as number || 5001;
  const https_port: number =
    (process.env.HTTPS_PORT as unknown as number) || 5000;


  app.listen(http_port, () => {
    // console.clear();
    logger.info(`⚡️HTTP Server is running at http://localhost:${http_port}`);
    logger.info("Connecting to database...");
    
  });

const options = {
  key: fs.readFileSync("certificates/server.key"),
  cert: fs.readFileSync("certificates/server.cert"),
};

// Creating https server by passing
// options and app object
  https.createServer(options, app).listen(https_port, () => {
      logger.info(`⚡️HTTPS Server is running at http://localhost:${https_port}`);
  });
} catch (error: any) {
  logger.error(`"${error.message}"`);
}
