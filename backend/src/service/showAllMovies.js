import { Movie } from "../models/MovieModel.js"

export const showAllMovies = () => {
  return Movie.find({})
}
