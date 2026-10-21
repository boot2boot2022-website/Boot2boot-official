import express from "express";
import cors from "cors";


const app = express()

const allowedOrigins = [
  "https://boot2boot.com",
  "https://www.boot2boot.com",
  "https://boot2boot-official-git-main-team-b2-b.vercel.app",
  "https://boot2boot-official-git-main-team-b2-b.vercel.app/",
  process.env.CORS_ORIGIN, // allows whatever is in your .env (e.g., http://localhost:5173)
];
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}))


app.use(express.json({ limit: "16kb" }))

// Checking
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Boot2Boot API is running",
  });
});


//routes import
import formRoutes from "./routes/form.router.js"

//routes diclaration
app.use("/api/forms", formRoutes)

export { app }