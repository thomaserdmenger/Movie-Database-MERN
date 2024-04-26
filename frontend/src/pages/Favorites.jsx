import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { FaMinusCircle } from "react-icons/fa"
import { backendUrl } from "../api/api"
import Header from "../components/Header"
import MovieCard from "../components/MovieCard"
import Footer from "../components/Footer"

const Favorites = ({ movies, input, setInput, filterdMovies, setFilteredMovies }) => {
  const [favs, setFavs] = useState([])

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/favorites`)
      .then((res) => res.json())
      .then((data) => setFavs(data))
  }, [movies])

  const handleDelete = (e, favId) => {
    e.preventDefault()

    fetch(`${backendUrl}/api/v1/favorites/${favId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedFavs = favs.filter((fav) => fav._id !== data._id)
        setFavs(updatedFavs)
      })
  }

  return (
    <>
      <Header
        movies={movies}
        input={input}
        setInput={setInput}
        setFilteredMovies={setFilteredMovies}
      />
      <section className="px-8 py-12 bg-green-dark">
        {favs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4 min-h-screen">
            {favs.map((fav, index) => {
              return (
                <div className="" key={index}>
                  <Link to={`/movies/${fav._id}`}>
                    <MovieCard movie={fav} />
                    <button
                      onClick={(e) => handleDelete(e, fav._id)}
                      className="flex gap-2 items-center border-2 border-yellow rounded-full bg-green-dark mt-2">
                      <FaMinusCircle fill="#E9C46A" size={26} />
                      <p className="pr-2 text-yellow">Remove from Favorites</p>
                    </button>
                  </Link>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="flex justify-center min-h-screen">
            <p className="text-white">You have no favorites</p>
          </div>
        )}
      </section>
      <Footer />
    </>
  )
}

export default Favorites
