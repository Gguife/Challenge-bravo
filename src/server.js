import express from "express";
import cors from "cors";


const app = express();
app.use(cors());


app.get("/health", (_, res) =>{
  return res.send("Hello World!")
})

app.listen(8080, async ()=>{
  console.log("Server runing on port 8080")
})