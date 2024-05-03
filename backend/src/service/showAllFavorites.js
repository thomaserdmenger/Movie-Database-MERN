import { Favorite } from "../models/FavModel.js"

export const showAllFavorites = async () => {
  const allFavs = await Favorite.find({})
  return allFavs
}
