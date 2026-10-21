import express from "express";
import cors from "cors";


const app = express()

const allowedOrigins = [
  "https://boot2boot.com",
  "https://www.boot2boot.com",
  process.env.CORS_ORIGIN, // allows whatever is in your .env (e.g., http://localhost:5173)
];
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))


app.use(express.json({ limit: "16kb" }))

//routes import
import formRoutes from "./routes/form.router.js"

//routes diclaration
app.use("/api/forms", formRoutes)

export { app }