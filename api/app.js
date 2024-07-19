import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import path from 'path'
import helmet from 'helmet'
import { fileURLToPath } from "url"
import cookieParser from 'cookie-parser'
import mongoose from "mongoose"
import userRoutes from "./routes/user.route.js"
import postRoutes from "./routes/post.route.js"

dotenv.config({path : '../.env'})
const app = express()
const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.static(path.join(__dirname , "../client/dist")))

mongoose.connect( process.env.MONGO)
.then(()=> console.log("The db is connected"))

app.use("/api/user" , userRoutes )
app.use("/api/post" , postRoutes )

app.listen(PORT,()=>{
  console.log("running on port" , PORT)
})




