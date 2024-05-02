import { Movie } from "../models/MovieModel.js"

export const showOneMovie = (movieId) => {
  return Movie.findById(movieId)
}
