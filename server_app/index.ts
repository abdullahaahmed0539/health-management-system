import dotenv from "dotenv";
import { app } from "./app";
import { logger } from "./error-logger";
import mongoose from "mongoose";
import User from "./lib/models/user";
import { users, patients }  from "./data";
import Patient from "./lib/models/patient";
const fs = require("fs");

var https = require("https");


dotenv.config();

try {
  const connectionString: string = process.env.MONGODB_CONNECTION_STRING as string;

  mongoose
    .connect(connectionString)
    .then(async () => {
      logger.info("Database connection successful.");
      const user = await User.find();
      if (user.length === 0) {
        await User.bulkSave(users);
        const newUsers = await User.find();
        const newPatients = newUsers.filter(u => u.role === 'patient');
        const newDoctor = (newUsers.filter((u) => u.role === "doctor"))[0];
        patients.map((p, i) => {
          p.userId = newPatients[i].id
          p.treatmentHistory.map(t => t.doctorId = newDoctor.id)
        });
        await Patient.bulkSave(patients);
        logger.info('Data is seeded in the database')
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
