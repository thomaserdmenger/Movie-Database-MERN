import express from "express"
import { MoviesController } from "../controllers/MoviesController.js"

export const moviesRouter = express
  .Router()
  .get("/", MoviesController.getAllMovies)
  .get("/:movieId", MoviesController.getOneMovie)
  .post("/", MoviesController.postNewMovie)
  .delete("/:movieId", MoviesController.deleteOneMovie)
  .patch("/:movieId", MoviesController.patchOneMovie)
