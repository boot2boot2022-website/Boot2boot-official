import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js';
import "dotenv/config"

const connectDB = async () => {
    try {
        // fail early with a clear message if the env variable is missing
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env");
        }
        const baseUri = process.env.MONGODB_URI.trim().replace(/\/+$/, "");
        const connectionInstances = await mongoose.connect(`${baseUri}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstances.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error)
        process.exit(1)
    }
}

export default connectDB