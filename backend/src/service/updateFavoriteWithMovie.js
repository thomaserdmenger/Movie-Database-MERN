import { Favorite } from "../models/FavModel.js"

export const updateFavoriteWithMovie = async (movieId, updatedContent) => {
  const updatedFav = Favorite.findByIdAndUpdate(movieId, { $set: updatedContent }, { new: true })

  return updatedFav
}
