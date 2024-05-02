import { addMovieAsFavorite } from "./addMovieAsFavorite.js"
import { addNewMovie } from "./addNewMovie.js"
import { deleteOneFavorite } from "./deleteOneFavorite.js"
import { showAllMovies } from "./showAllMovies.js"
import { showOneMovie } from "./showOneMovie.js"
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
}
