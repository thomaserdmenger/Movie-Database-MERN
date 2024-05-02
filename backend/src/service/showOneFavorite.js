import { Favorite } from "../models/FavModel.js"

export const showOneFavorite = (favId) => {
  return Favorite.findById(favId)
}
