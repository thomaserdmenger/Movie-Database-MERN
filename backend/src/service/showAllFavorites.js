import { Favorite } from "../models/FavModel.js"

export const showAllFavorites = () => {
  return Favorite.find({})
}
