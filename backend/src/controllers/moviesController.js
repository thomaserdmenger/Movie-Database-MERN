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

const postNewMovie = (req, res) => {
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
}

const deleteOneMovie = (req, res) => {
  const movieId = req.params.movieId

  MoviesService.deleteOneMovie(movieId)
    .then((deletedMovie) => res.json(deletedMovie || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movie" })
    })
}

const patchOneMovie = (req, res) => {
  const movieId = req.params.movieId
  const updatedContent = req.body

  MoviesService.updateOneMovie(movieId, updatedContent)
    .then((updatedMovie) => res.json(updatedMovie || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movie" })
    })
}

export const MoviesController = {
  getAllMovies,
  getOneMovie,
  postNewMovie,
  deleteOneMovie,
  patchOneMovie,
}
