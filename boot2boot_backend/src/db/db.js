import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js';
import "dotenv/config"

const connectDB = async () => {
    try {
        // fail early with a clear message if the env variable is missing
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is not defined in .env");
        }
        const connectionInstances = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstances.connection.host}`)
    } catch (error) {
        console.log("MONGODB connection error", error)
        process.exit(1)
    }
}

export default connectDB