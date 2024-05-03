import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import { connectToDataBase } from "./models/index.js"
import { FavoritesService } from "./service/index.js"
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

// GetAll: Get all Favorites
app.get("/api/v1/favorites", (req, res) => {
  FavoritesService.showAllFavorites()
    .then((favorites) => res.json(favorites))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorites" })
    })
})

// UpdateOne: Update Fav when Movie updates
app.patch("/api/v1/movies/:movieId/update", (req, res) => {
  const movieId = req.params.movieId
  const updatedContent = req.body

  FavoritesService.updateFavoriteWithMovie(movieId, updatedContent)
    .then((updatedFav) => res.json(updatedFav || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find fav" })
    })
})

// GetOne: Favorite
app.get("/api/v1/favorites/:movieId", (req, res) => {
  const movieId = req.params.movieId

  FavoritesService.showOneFavorite(movieId)
    .then((favorite) => res.json(favorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Favorite does not exist" })
    })
})

// Neu: Conditional: App soll auf eingehene Request erst warten, wenn Verbindung zur Datenbank hergestellt ist

connectToDataBase()
  .then(() => {
    const PORT = process.env.PORT
    app.listen(PORT, () => console.log("Server runs", PORT))
  })
  .catch((err) => {
    console.log(err)
    process.exit() // Node Prozess beenden, wenn nicht keine Datenbankverbindung
  })
