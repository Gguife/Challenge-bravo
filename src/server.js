import express from "express";
import cors from "cors";
import db from "./config/database.js";
import routes from "./routes/router.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);

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
  console.log("Server is running on port 8080");
})