import { Movie } from "../models/MovieModel.js"

export const addNewMovie = (movieData) => {
  return Movie.create(movieData)
}
