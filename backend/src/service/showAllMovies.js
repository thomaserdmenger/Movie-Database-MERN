import { Movie } from "../models/MovieModel.js"

export const showAllMovies = async () => {
  const allMovies = await Movie.find({})
  return allMovies
}
