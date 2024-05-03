import { FavoritesService } from "../service/index.js"

const getAllFavorites = (req, res) => {
  FavoritesService.showAllFavorites()
    .then((favorites) => res.json(favorites))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorites" })
    })
}

const postNewFavorite = (req, res) => {
  const newFavorite = {
    ...req.body,
    _id: req.body._id,
    movieId: req.params.movieId,
  }

  FavoritesService.addMovieAsFavorite(newFavorite)
    .then((newFavorite) => res.json(newFavorite || {}))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not found Favorite" })
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

export const FavoritesController = { postNewFavorite, deleteOneFavorite, getAllFavorites }
