import { ObjectId } from "mongodb"
import { getDb } from "./getDb.js"

const favoritesCollection = "favoriteMovies"

// CreateOne: Add new favorite to collection
const createNewFavorites = (favoriteContent) => {
  return getDb()
    .then((db) => db.collection(favoritesCollection).insertOne(favoriteContent))
    .then((result) => {
      if (result.acknowledged === false) return null

      return { _id: result.insertedId, ...favoriteContent }
    })
}

const getOneFavorite = (movieId) => {
  const movieIdToHexString = ObjectId.createFromHexString(movieId)

  return getDb().then((db) =>
    db.collection(favoritesCollection).findOne({ movieId: movieIdToHexString })
  )
}

// Delete Favorite from collection
const deleteFavorite = (favoriteId) => {
  return getDb().then((db) =>
    db.collection(favoritesCollection).findOneAndDelete({ _id: favoriteId })
  )
}

// Get Favorites from Collection
const getFavorites = () => {
  return getDb().then((db) => db.collection(favoritesCollection).find().toArray())
}

// UpdateOne: Update Fav when Movie updates
const updateOneFav = (movieId, updatedContent) => {
  const movieIdToHexString = ObjectId.createFromHexString(movieId)

  return getDb().then((db) =>
    db
      .collection(favoritesCollection)
      .updateOne({ movieId: movieIdToHexString }, { $set: updatedContent })
      .then((result) => {
        if (result.acknowledged === false) return null
        return getOneFavorite(movieId)
      })
  )
}

export const favoritesDAO = {
  createNewFavorites,
  deleteFavorite,
  getFavorites,
  getOneFavorite,
  updateOneFav
}
