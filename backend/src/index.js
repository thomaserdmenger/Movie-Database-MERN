import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import { connectToDataBase } from "./models/index.js"
import { Movie } from "./models/MovieModel.js"
import { Favorite } from "./models/FavModel.js"
import { FavoritesService, MoviesService } from "./service/index.js"

// Import from dotenv
config()

// Create Express App mit Server
const app = express()

// Middleware
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// Create CRUD Routes
// Endpoints for Movies Collection
// ReadAll movies from DB
app.get("/api/v1/movies", (req, res) => {
  MoviesService.showAllMovies()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movies" })
    })
})

// ReadOne movie from DB
app.get("/api/v1/movies/:movieId", (req, res) => {
  MoviesService.showOneMovie(req.params.movieId)
    .then((movie) => res.json(movie))
    .catch((err) => {
      console.log(err)
      res.status(500).res.json({ err, message: "Could not find movie" })
    })
})

// CreateOne movie in DB
app.post("/api/v1/movies", (req, res) => {
  const newMovie = {
    title: req.body.title,
    year: req.body.year,
    director: req.body.director,
    plot: req.body.plot,
    imdb: { rating: req.body.imdb.rating },
  }

  MoviesService.addNewMovie(newMovie)
    .then((newMovie) => res.json(newMovie || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movie" })
    })
})

// ! DeleteOne movie in database
app.delete("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId

  Movie.findByIdAndDelete(movieId)
    .then((deletedMovie) => res.json(deletedMovie || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movie" })
    })
})

// UpdateOne movie in database
app.patch("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId
  const updatedContent = req.body

  MoviesService.updateOneMovie(movieId, updatedContent)
    .then((updatedMovie) => res.json(updatedMovie || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movie" })
    })
})

// Endpoints for Favorites Collection
// CreateOne: Add new Favorite to Collection
app.post("/api/v1/movies/:movieId/favorites", (req, res) => {
  const newFavorite = {
    ...req.body,
    _id: req.body._id,
    movieId: req.params.movieId,
  }

  FavoritesService.addMovieAsFavorite(newFavorite)
    .then((newFavorite) => res.json(newFavorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorite" })
    })
})

// DeleteOne: Delete Favorite from Collection
app.delete("/api/v1/favorites/:favoriteId", (req, res) => {
  const favoriteId = req.params.favoriteId

  FavoritesService.deleteOneFavorite(favoriteId)
    .then((deletedFavorite) => res.json(deletedFavorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorite" })
    })
})

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
