import mongoose from"mongoose";
import "dotenv/config";

export default function db(){
    mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => console.log("Database connected successfully.....😁"))
      .catch(() => console.error("Error while connecting the mongodb"));
}