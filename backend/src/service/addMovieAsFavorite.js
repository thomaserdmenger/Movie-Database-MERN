import { Favorite } from "../models/FavModel.js"

export const addMovieAsFavorite = async (movie) => {
  const addedFav = await Favorite.create(movie)
  return addedFav
}
