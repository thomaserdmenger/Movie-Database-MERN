import { Favorite } from "../models/FavModel.js"

export const deleteOneFavorite = async (favId) => {
  const deletedFav = await Favorite.findByIdAndDelete(favId)
  return deletedFav
}
