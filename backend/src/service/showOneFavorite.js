import { Favorite } from "../models/FavModel.js"

export const showOneFavorite = async (favId) => {
  const singleFav = await Favorite.findById(favId)
  return singleFav
}
