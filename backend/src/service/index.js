import { addMovieAsFavorite } from "./addMovieAsFavorite.js"
import { addNewMovie } from "./addNewMovie.js"
import { deleteOneFavorite } from "./deleteOneFavorite.js"
import { showAllFavorites } from "./showAllFavorites.js"
import { showAllMovies } from "./showAllMovies.js"
import { showOneFavorite } from "./showOneFavorite.js"
import { showOneMovie } from "./showOneMovie.js"
import { updateFavoriteWithMovie } from "./updateFavoriteWithMovie.js"
import { updateOneMovie } from "./updateOneMovie.js"

export const MoviesService = {
  showAllMovies,
  showOneMovie,
  addNewMovie,
  updateOneMovie,
}

export const FavoritesService = {
  addMovieAsFavorite,
  deleteOneFavorite,
  showAllFavorites,
  showOneFavorite,
  updateFavoriteWithMovie,
}
