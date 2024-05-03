import express from "express"
import { MoviesController } from "../controllers/MoviesController.js"

export const moviesRouter = express
  .Router()
  .get("/", MoviesController.getAllMovies)
  .get("/:movieId", MoviesController.getOneMovie)
  .post("/", MoviesController.postNewMovie)
  .post("/:movieId/favorites", MoviesController.postNewFavorite)
  .delete("/:movieId", MoviesController.deleteOneMovie)
  .patch("/:movieId", MoviesController.patchOneMovie)
  .patch("/:movieId/update", MoviesController.patchOneFavorite)
