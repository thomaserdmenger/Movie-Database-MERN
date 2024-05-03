import { FavoritesService, MoviesService } from "../service/index.js"

const getAllMovies = async (req, res) => {
  try {
    const allMovies = await MoviesService.showAllMovies()
    res.json(allMovies)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not find movies" })
  }
}

const getOneMovie = async (req, res) => {
  try {
    const singleMovie = await MoviesService.showOneMovie(req.params.movieId)
    res.json(singleMovie || {})
  } catch (error) {
    console.log(error)
    res.status(500).res.json({ error, message: "Could not find movie" })
  }
}

const postNewMovie = async (req, res) => {
  try {
    const newMovie = {
      title: req.body.title,
      year: req.body.year,
      director: req.body.director,
      plot: req.body.plot,
      imdb: { rating: req.body.imdb.rating },
    }

    const addedMovie = await MoviesService.addNewMovie(newMovie)
    res.json(addedMovie || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not add new movie" })
  }
}

const deleteOneMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId
    const deletedMovie = await MoviesService.deleteOneMovie(movieId)
    res.json(deletedMovie || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not delete movie" })
  }
}

const patchOneMovie = async (req, res) => {
  try {
    const movieId = req.params.movieId
    const updatedContent = req.body
    const updatedMovie = await MoviesService.updateOneMovie(movieId, updatedContent)
    res.json(updatedMovie || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not update movie" })
  }
}

const postNewFavorite = async (req, res) => {
  try {
    const newFavorite = {
      ...req.body,
      _id: req.body._id,
      movieId: req.params.movieId,
    }

    const addedFavorite = FavoritesService.addMovieAsFavorite(newFavorite)
    res.json(addedFavorite || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not add Favorite" })
  }
}

const patchOneFavorite = async (req, res) => {
  try {
    const movieId = req.params.movieId
    const updatedContent = req.body
    const updatedFav = await FavoritesService.updateFavoriteWithMovie(movieId, updatedContent)
    res.json(updatedFav || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not update fav" })
  }
}

export const MoviesController = {
  getAllMovies,
  getOneMovie,
  postNewMovie,
  deleteOneMovie,
  patchOneMovie,
  postNewFavorite,
  patchOneFavorite,
}
