import mongoose from "mongoose"

const favSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    director: { type: String, required: true, trim: true },
    plot: { type: String, required: true, trim: true },
    imdb: {
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
      }
    }
  },
  { collection: "favoriteMovies" }
)

export const Favorite = mongoose.model("Favorite", favSchema)
