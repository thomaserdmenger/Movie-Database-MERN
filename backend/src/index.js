import express from "express"
import morgan from "morgan"
import cors from "cors"
import { config } from "dotenv"
import { moviesDAO } from "./db-access/moviesDAO.js"
import { favoritesDAO } from "./db-access/favoritesDAO.js"
import { ObjectId } from "mongodb"

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
  moviesDAO
    .findAllMovies()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movies" })
    })
})

// ReadOne movie from DB
app.get("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId

  moviesDAO
    .findOneMovie(movieId)
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
    imdb: { rating: req.body.rating }
  }

  moviesDAO
    .createNewMovie(newMovie)
    .then((newMovie) => res.json(newMovie || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movie" })
    })
})

// DeleteOne movie in database
app.delete("/api/v1/movies/:movieId", (req, res) => {
  const movieId = req.params.movieId

  moviesDAO
    .deleteOneMovie(movieId)
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

  moviesDAO
    .updateOneMovie(movieId, updatedContent)
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
    _id: ObjectId.createFromHexString(req.body._id),
    movieId: ObjectId.createFromHexString(req.params.movieId)
  }

  favoritesDAO
    .createNewFavorites(newFavorite)
    .then((newFavorite) => res.json(newFavorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorite" })
    })
})

// DeleteOne: Delete Favorite from Collection
app.delete("/api/v1/favorites/:favoriteId", (req, res) => {
  const favoriteId = ObjectId.createFromHexString(req.params.favoriteId)

  favoritesDAO
    .deleteFavorite(favoriteId)
    .then((deletedFavorite) => res.json(deletedFavorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorite" })
    })
})

// GetAll: Get all Favorites
app.get("/api/v1/favorites", (req, res) => {
  favoritesDAO
    .getFavorites()
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

  favoritesDAO
    .updateOneFav(movieId, updatedContent)
    .then((updatedFav) => res.json(updatedFav || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find fav" })
    })
})

// GetOne: Favorite
app.get("/api/v1/favorites/:movieId", (req, res) => {
  const movieId = req.params.movieId

  favoritesDAO
    .getOneFavorite(movieId)
    .then((favorite) => res.json(favorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Favorite does not exist" })
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log("Server runs", PORT))
