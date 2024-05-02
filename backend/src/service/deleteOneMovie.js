import { Movie } from "../models/MovieModel.js"
import { deleteOneFavorite } from "./deleteOneFavorite.js"
import { showOneFavorite } from "./showOneFavorite.js"

export const deleteOneMovie = (movieId, favId) => {
  return showOneFavorite(favId).then((foundedFav) => {
    if (!foundedFav) {
      return Movie.findByIdAndDelete(movieId)
    } else {
      return deleteOneFavorite(favId).then(() => Movie.findByIdAndDelete(movieId))
    }
  })
}
