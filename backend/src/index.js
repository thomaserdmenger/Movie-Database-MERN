import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import { connectToDataBase } from "./models/index.js"
import { moviesRouter } from "./routers/moviesRouter.js"
import { favoritesRouter } from "./routers/favoritesRouter.js"

config()

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.use("/api/v1/movies", moviesRouter)
app.use("/api/v1/favorites", favoritesRouter)

try {
  await connectToDataBase()
  const PORT = process.env.PORT
  app.listen(PORT, () => console.log("Server runs", PORT))
} catch (err) {
  console.log(err)
  process.exit()
}
