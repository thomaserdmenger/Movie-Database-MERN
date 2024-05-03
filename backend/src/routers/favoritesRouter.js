import express from "express"
import { FavoritesController } from "../controllers/favoritesController.js"

export const favoritesRouter = express
  .Router()
  .get("/", FavoritesController.getAllFavorites)
  .get("/:movieId", FavoritesController.getOneFavorite)
  .delete("/:favoriteId", FavoritesController.deleteOneFavorite)
