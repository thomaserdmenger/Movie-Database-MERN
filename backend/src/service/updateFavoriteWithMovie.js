import { Favorite } from "../models/FavModel.js"

export const updateFavoriteWithMovie = (movieId, updatedContent) => {
  return Favorite.findByIdAndUpdate(movieId, { $set: updatedContent }, { new: true })
}
