import { useParams } from "react-router-dom"
import { FaPlusCircle } from "react-icons/fa"
import { useEffect, useState } from "react"
import { backendUrl } from "../api/api"
import Header from "../components/Header"
import Footer from "../components/Footer"

const DetailsPage = ({
  singleMovie,
  setSingleMovie,
  movies,
  input,
  setInput,
  filterdMovies,
  setFilteredMovies
}) => {
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [director, setDirector] = useState("")
  const [rating, setRating] = useState("")
  const [plot, setPlot] = useState("")
  const [openForm, setOpenForm] = useState(false)
  const [favDisabled, setFavDisabled] = useState(false)
  const [singleFavorite, setSingleFavorite] = useState({})
  const { movieId } = useParams()

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        setSingleMovie(data)
      })
  }, [])

  useEffect(() => {
    fetch(`${backendUrl}/api/v1/favorites/${movieId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data._id === movieId) {
          setFavDisabled(true)
        } else {
          setFavDisabled(false)
        }
      })
  }, [singleFavorite])

  const handleEdit = () => {
    setTitle(singleMovie.title)
    setYear(singleMovie.year)
    setDirector(singleMovie.director)
    setRating(singleMovie.imdb.rating)
    setPlot(singleMovie.plot)
    setOpenForm(!openForm)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { _id, ...updatedMovieWithoutId } = singleMovie

    const updatedMovie = {
      ...updatedMovieWithoutId,
      title,
      year,
      director,
      imdb: { ...singleMovie.imdb, rating },
      plot
    }

    fetch(`${backendUrl}/api/v1/movies/${movieId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie)
    })
      .then((res) => res.json())
      .then((data) => {
        setSingleMovie(data)
      })

    fetch(`${backendUrl}/api/v1/movies/${movieId}/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedMovie)
    })

    setOpenForm(!openForm)
  }

  const handleAddToFavorites = () => {
    const favoritesContent = { ...singleMovie }

    fetch(`${backendUrl}/api/v1/movies/${movieId}/favorites`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(favoritesContent)
    })
      .then((res) => res.json())
      .then((data) => setSingleFavorite(data))
  }

  return (
    <>
      <Header
        movies={movies}
        input={input}
        setInput={setInput}
        filterdMovies={filterdMovies}
        setFilteredMovies={setFilteredMovies}
      />
      <section className="bg-green-dark py-12 px-12">
        {singleMovie ? (
          <section>
            <article>
              <h1 className="text-light-red font-bold text-3xl mb-1">{singleMovie.title}</h1>
              <div className="flex gap-1 text-white mb-4">
                <p>{singleMovie.year}</p>
                <span>I</span>
                <p>{singleMovie.director}</p>
              </div>

              <div className="flex gap-2 mb-2">
                <button
                  disabled={favDisabled}
                  onClick={handleAddToFavorites}
                  className="flex gap-2 items-center border-2 border-yellow rounded-full bg-green-dark disabled:border-disabled">
                  <FaPlusCircle fill={`${favDisabled ? "disabled" : "#E9C46A"}`} size={26} />
                  <p className={` pr-2 ${favDisabled ? "text-disabled" : "text-yellow"}`}>
                    Add to Favorites
                  </p>
                </button>
                <button
                  className="flex gap-2 items-center border-2 border-petrol rounded-full"
                  onClick={handleEdit}>
                  <p className="text-petrol px-2">Edit Movie</p>
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <img src="/images/movie.jpg" alt="Movie Image" />
                  <div className="flex gap-6 mt-2 text-white">
                    <p>Rating: {singleMovie.imdb.rating}</p>
                    <p>Duration: {singleMovie.runtime} min</p>
                  </div>
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {singleMovie.genres?.map((item, index) => (
                      <p className="bg-petrol text-white rounded-full px-2 py-1" key={index}>
                        {item}
                      </p>
                    ))}
                  </div>
                  <h2 className="font-bold text-2xl text-light-red mb-2">Story</h2>
                  <p className="text-white">{singleMovie.plot}</p>
                </div>
              </div>
            </article>

            {openForm && (
              <article className="mt-12">
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                  <input
                    className="p-1 rounded"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                    className="p-1 rounded"
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                  <input
                    className="p-1 rounded"
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                  />
                  <input
                    className="p-1 rounded"
                    type="number"
                    min={1}
                    max={10}
                    step={0.1}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />{" "}
                  <textarea
                    className="h-24 p-1 rounded"
                    type="text"
                    value={plot}
                    onChange={(e) => setPlot(e.target.value)}
                  />
                  <button className="bg-petrol text-white p-1 rounded-full" type="">
                    Submit
                  </button>
                </form>
              </article>
            )}
          </section>
        ) : (
          <div className="flex justify-center h-[400px]">
            <p className="text-white">Loading...</p>
          </div>
        )}
      </section>
      <Footer />
    </>
  )
}

export default DetailsPage
