import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import { connectToDataBase } from "./models/index.js"
import { MoviesController } from "./controllers/MoviesController.js"
import { FavoritesController } from "./controllers/favoritesController.js"

config()

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

app.get("/api/v1/movies", MoviesController.getAllMovies)
app.get("/api/v1/movies/:movieId", MoviesController.getOneMovie)
app.post("/api/v1/movies", MoviesController.postNewMovie)
app.delete("/api/v1/movies/:movieId", MoviesController.deleteOneMovie)
app.patch("/api/v1/movies/:movieId", MoviesController.patchOneMovie)
app.post("/api/v1/movies/:movieId/favorites", FavoritesController.postNewFavorite)
app.delete("/api/v1/favorites/:favoriteId", FavoritesController.deleteOneFavorite)
app.get("/api/v1/favorites", FavoritesController.getAllFavorites)
app.patch("/api/v1/movies/:movieId/update", FavoritesController.patchOneFavorite)
app.get("/api/v1/favorites/:movieId", FavoritesController.getOneFavorite)

connectToDataBase()
  .then(() => {
    const PORT = process.env.PORT
    app.listen(PORT, () => console.log("Server runs", PORT))
  })
  .catch((err) => {
    console.log(err)
    process.exit()
  })
