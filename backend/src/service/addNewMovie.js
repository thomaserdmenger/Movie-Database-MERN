import { Movie } from "../models/MovieModel.js"

export const addNewMovie = async (movieData) => {
  const addedMovie = await Movie.create(movieData)
  return addedMovie
}
