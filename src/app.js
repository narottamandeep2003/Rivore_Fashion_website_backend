import express, { json } from 'express'
import cors from "cors"
import router from './routes/api.router.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
const app=express()
app.use(
  cors({
      credentials: true,
      origin: "http://localhost:3000",
      optionsSuccessStatus: 200,
  })
);

app.use(json())
app.use(cookieParser())
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use("/api",router)
app.get("/",(req,res)=>{
    console.log(req)
    res.cookie("mk","mm").send("hello")
})
export default app