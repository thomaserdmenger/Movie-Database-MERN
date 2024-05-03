import { MoviesService } from "../service/index.js"

const getAllMovies = (req, res) => {
  MoviesService.showAllMovies()
    .then((movies) => res.json(movies))
    .catch((err) => {
      console.log(err)
      res.status(500).json({ err, message: "Could not find movies" })
    })
}

export const MoviesController = { getAllMovies }
