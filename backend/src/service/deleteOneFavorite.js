import { Favorite } from "../models/FavModel.js"

export const deleteOneFavorite = (favId) => {
  return Favorite.findByIdAndDelete(favId)
}
