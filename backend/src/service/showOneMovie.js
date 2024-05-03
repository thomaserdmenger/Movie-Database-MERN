import { Movie } from "../models/MovieModel.js"

export const showOneMovie = async (movieId) => {
  const singleMovie = await Movie.findById(movieId)
  return singleMovie
}
