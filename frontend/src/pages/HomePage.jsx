import Footer from "../components/Footer.jsx"
import Header from "../components/Header"
import Hero from "../components/Hero.jsx"
import MovieCard from "../components/MovieCard.jsx"
import { Link } from "react-router-dom"

const Home = ({ movies, amount, setAmount, input, setInput, filterdMovies, setFilteredMovies }) => {
  return (
    <>
      <Header
        movies={movies}
        input={input}
        setInput={setInput}
        setFilteredMovies={setFilteredMovies}
      />
      <Hero />

      {filterdMovies.length === 0 ? (
        <section className="px-8 py-12 bg-green-dark">
          {movies.length === 0 ? (
            <div className="flex justify-center h-[400px]">
              <p className="text-white">Loading...</p>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
                {movies.slice(0, amount).map((movie) => {
                  return (
                    <Link key={movie._id} to={`/movies/${movie._id}`}>
                      <MovieCard movie={movie} />
                    </Link>
                  )
                })}
              </div>
              <button
                onClick={() => setAmount(amount + 10)}
                className="text-white rounded-full bg-petrol px-2 py-1 mt-4">
                More Movies
              </button>
            </div>
          )}
        </section>
      ) : (
        <section className="px-8 py-12 bg-green-dark">
          {filterdMovies.length > 0 && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-4">
                {filterdMovies.slice(0, amount).map((movie) => {
                  return (
                    <Link key={movie._id} to={`/movies/${movie._id}`}>
                      <MovieCard movie={movie} />
                    </Link>
                  )
                })}
              </div>

              {filterdMovies.length > 10 && filterdMovies.length < movies.length && (
                <button
                  onClick={() => setAmount(amount + 10)}
                  className="text-white rounded-full bg-petrol px-2 py-1 mt-4">
                  More Movies
                </button>
              )}
            </div>
          )}
        </section>
      )}

      <Footer />
    </>
  )
}

export default Home
