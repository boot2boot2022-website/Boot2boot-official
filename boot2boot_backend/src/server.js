import connectDB from "./db/db.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 5500

connectDB()
.then(()=>{

    app.on("error", (error)=>{
        console.log("ERROR", error)
        throw error
    })

    app.listen(PORT, () => {
        console.log(` Server is listening on port http://localhost:${PORT}`)
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!" , err);
})