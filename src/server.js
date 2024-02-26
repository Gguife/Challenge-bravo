import express from "express";
import cors from "cors";
import db from "./config/database.js";

const app = express();
app.use(cors());

db.sync()
  .then(() => {
    console.log(`DB is connected: ${process.env.DB_NAME}`);
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });
  
app.get("/health", (_, res) =>{
  return res.send("Hello World!")
})

app.listen(8080, async ()=>{
  console.log("Server is running on port 8080")
})