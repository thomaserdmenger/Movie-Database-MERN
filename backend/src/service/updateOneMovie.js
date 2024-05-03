import { Movie } from "../models/MovieModel.js"

export const updateOneMovie = async (movieId, movieContent) => {
  const updatedMovie = await Movie.findByIdAndUpdate(movieId, { $set: movieContent }, { new: true })

  return updatedMovie
}
