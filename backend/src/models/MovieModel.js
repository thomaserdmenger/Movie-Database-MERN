import mongoose from "mongoose"

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    director: { type: String, required: true, trim: true },
    plot: { type: String, required: true, trim: true },
    imdb: {
      rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10,
      },
      movieId: { type: mongoose.Types.ObjectId },
    },
  },
  { collection: "movieDetails" }
)

export const Movie = mongoose.model("Movie", movieSchema)
