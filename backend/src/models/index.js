import mongoose from "mongoose"
import { config } from "dotenv"

config()

export const connectToDataBase = () => {
  const dbUrl = process.env.DB_URI
  return mongoose.connect(dbUrl, { dbName: "video" })
}
