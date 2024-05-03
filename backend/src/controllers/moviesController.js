import { MoviesService } from "../service/index.js"

const getAllMovies = (req, res) => {
  MoviesService.showAllMovies()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movies" })
    })
}

const getOneMovie = (req, res) => {
  MoviesService.showOneMovie(req.params.movieId)
    .then((movie) => res.json(movie))
    .catch((err) => {
      console.log(err)
      res.status(500).res.json({ err, message: "Could not find movie" })
    })
}

export const MoviesController = { getAllMovies, getOneMovie }
