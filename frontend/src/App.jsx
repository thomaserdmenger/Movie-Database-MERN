import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import DetailsPage from "./pages/DetailsPage"
import Favorites from "./pages/Favorites"
import { useEffect, useState } from "react"
import { backendUrl } from "./api/api.js"
import AddNewMovie from "./pages/AddNewMovie.jsx"

function App() {
  const [movies, setMovies] = useState([])
  const [amount, setAmount] = useState(10)
  const [singleMovie, setSingleMovie] = useState(null)
  const [input, setInput] = useState("")
  const [filterdMovies, setFilteredMovies] = useState([])

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/movies`)
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => console.log(err))
  }, [amount, singleMovie])

  return (
    <div className="max-w-[1440px] m-auto">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                movies={movies}
                amount={amount}
                setAmount={setAmount}
                input={input}
                setInput={setInput}
                filterdMovies={filterdMovies}
                setFilteredMovies={setFilteredMovies}
              />
            }
          />
          <Route
            path="/favs"
            element={
              <Favorites
                movies={movies}
                input={input}
                setInput={setInput}
                filterdMovies={filterdMovies}
                setFilteredMovies={setFilteredMovies}
              />
            }
          />
          <Route
            path="/movies/newMovie"
            element={
              <AddNewMovie
                movies={movies}
                setMovies={setMovies}
                input={input}
                setInput={setInput}
                filterdMovies={filterdMovies}
                setFilteredMovies={setFilteredMovies}
              />
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <DetailsPage
                singleMovie={singleMovie}
                setSingleMovie={setSingleMovie}
                movies={movies}
                setMovies={setMovies}
                input={input}
                setInput={setInput}
                filterdMovies={filterdMovies}
                setFilteredMovies={setFilteredMovies}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
