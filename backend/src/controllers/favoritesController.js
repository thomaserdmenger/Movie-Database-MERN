import { FavoritesService } from "../service/index.js"

const getAllFavorites = async (req, res) => {
  try {
    const allFavs = await FavoritesService.showAllFavorites()
    res.json(allFavs || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not found Favorites" })
  }
}

const getOneFavorite = async (req, res) => {
  try {
    const movieId = req.params.movieId
    const foundFav = await FavoritesService.showOneFavorite(movieId)
    res.json(foundFav || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Favorite does not exist" })
  }
}

const deleteOneFavorite = async (req, res) => {
  try {
    const favoriteId = req.params.favoriteId
    const deletedFav = await FavoritesService.deleteOneFavorite(favoriteId)
    res.json(deletedFav || {})
  } catch (error) {
    console.log(error)
    res.status(500).json({ error, message: "Could not found Favorite" })
  }
}

export const FavoritesController = {
  deleteOneFavorite,
  getAllFavorites,
  getOneFavorite,
}
