import { Movie } from "../models/MovieModel.js"
import { deleteOneFavorite } from "./deleteOneFavorite.js"
import { showOneFavorite } from "./showOneFavorite.js"

export const deleteOneMovie = async (movieId) => {
  const foundFavorite = await showOneFavorite(movieId)
  if (!foundFavorite) return Movie.findByIdAndDelete(movieId)

  await deleteOneFavorite(movieId)
  return Movie.findByIdAndDelete(movieId)
}
