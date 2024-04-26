// ! DAO: DatabaseAccessObject
import { ObjectId } from "mongodb"
import { getDb } from "./getDb.js"

const moviesCollection = "movieDetails"

// ReadAll: Find and return all movies
const findAllMovies = () => {
  return getDb().then((db) => db.collection(moviesCollection).find().toArray()) // toArray() => Convert query results to an array
}

// ReadOne: Find and return a movie by id
const findOneMovie = (movieId) => {
  const movieIdAsObjectId = ObjectId.createFromHexString(movieId)

  return getDb().then((db) => db.collection(moviesCollection).findOne({ _id: movieIdAsObjectId }))
}

// CreateOne: Create a new movie in database
const createNewMovie = (movieData) => {
  return getDb()
    .then((db) => db.collection(moviesCollection).insertOne(movieData))

    .then((result) => {
      if (result.acknowledged === false) return null
      return { ...movieData, _id: result.insertedId }
    })
}

// DeleteOne: Delete a movie in database by id
const deleteOneMovie = (movieId) => {
  const movieIdAsObjectId = ObjectId.createFromHexString(movieId)

  return getDb().then((db) =>
    db.collection(moviesCollection).findOneAndDelete({ _id: movieIdAsObjectId })
  )
}

// UpdateOne: Update
const updateOneMovie = (movieId, updatedData) => {
  const movieIdAsObjectId = ObjectId.createFromHexString(movieId)

  return getDb().then((db) =>
    db
      .collection(moviesCollection)
      .updateOne({ _id: movieIdAsObjectId }, { $set: updatedData })
      .then((result) => {
        if (result.acknowledged === false) return null

        return findOneMovie(movieId)
      })
  )
}

export const moviesDAO = {
  findAllMovies,
  findOneMovie,
  createNewMovie,
  deleteOneMovie,
  updateOneMovie
}
