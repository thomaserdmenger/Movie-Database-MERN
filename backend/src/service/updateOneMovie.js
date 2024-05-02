import { Movie } from "../models/MovieModel.js"

export const updateOneMovie = (movieId, movieContent) => {
  return Movie.findByIdAndUpdate(movieId, { $set: movieContent }, { new: true })
}
