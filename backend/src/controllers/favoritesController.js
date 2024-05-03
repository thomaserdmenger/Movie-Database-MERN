import { FavoritesService } from "../service/index.js"

const getAllFavorites = (req, res) => {
  FavoritesService.showAllFavorites()
    .then((favorites) => res.json(favorites))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorites" })
    })
}

const getOneFavorite = (req, res) => {
  const movieId = req.params.movieId

  FavoritesService.showOneFavorite(movieId)
    .then((favorite) => res.json(favorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Favorite does not exist" })
    })
}

const deleteOneFavorite = (req, res) => {
  const favoriteId = req.params.favoriteId

  FavoritesService.deleteOneFavorite(favoriteId)
    .then((deletedFavorite) => res.json(deletedFavorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorite" })
    })
}

export const FavoritesController = {
  deleteOneFavorite,
  getAllFavorites,
  getOneFavorite,
}
