// ! Create a Connection to the database
// Importieren des Mongo Clients
import { MongoClient } from "mongodb"
import { config } from "dotenv"

// Import from dotenv
config()

// Load Connection String from dotenv
const url = process.env.DB_URI

// Create a new MongoClient Object with Connection URL
const mongoClient = new MongoClient(url)

// Create a Connection to the database and return the database (as a promise)
export const getDb = () => {
  // Create a Connecton to the database: returns a promise with connect()
  return mongoClient.connect().then((connectedClient) => connectedClient.db("video")) // Access and return database with db(database-name)
}
