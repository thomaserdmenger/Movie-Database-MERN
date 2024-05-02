import { Movie } from "../models/MovieModel.js"
import { deleteOneFavorite } from "./deleteOneFavorite.js"
import { showOneFavorite } from "./showOneFavorite.js"

export const deleteOneMovie = (movieId) => {
  return showOneFavorite(movieId).then((foundedFav) => {
    if (!foundedFav) {
      return Movie.findByIdAndDelete(movieId)
    } else {
      return deleteOneFavorite(movieId).then(() => Movie.findByIdAndDelete(movieId))
    }
  })
}
