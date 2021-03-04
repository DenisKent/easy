import "reflect-metadata"
import app from "./app";

const PORT = process.env.PORT || 8000;

import { createConnection } from "typeorm";
// import {join} from "path";
// import {__prod__} from "./constants";

const connectToDB = async () => {
    await createConnection({
        type: "postgres",
        url: process.env.DATABASE_URL,
        // database: process.env.DATABASE_NAME,
        // dropSchema: true,
        // entities: [join(__dirname, "./models/entities/*.*")],
        logging: true,
        // synchronize: !__prod__
    });
};

connectToDB()
.then(() => {
    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
    });
});