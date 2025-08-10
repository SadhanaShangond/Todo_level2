import express from "express";
import cors from "cors";
import "dotenv/config"
import db from "./utils/db.js";
import router from "./routes/taskRoutes.js";

const app = express();
const port = process.env.PORT || 5001;

//Middlewares
app.use(cors());
app.use(express.urlencoded(true));
app.use(express.json());

//db
db();
//routes
app.use("/api/v1",router);
//connection
app.listen(port,()=>{
    console.log(`server is running on port ${port}...😎`);
})