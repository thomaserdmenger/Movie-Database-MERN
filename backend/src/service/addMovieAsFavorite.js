import { Favorite } from "../models/FavModel.js"

export const addMovieAsFavorite = (movie) => {
  return Favorite.create(movie)
}
