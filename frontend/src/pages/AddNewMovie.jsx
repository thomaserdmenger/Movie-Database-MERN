import { useState } from "react"
import Header from "../components/Header"
import { backendUrl } from "../api/api"
import Hero from "../components/Hero"
import Footer from "../components/Footer"

const AddNewMovie = ({ movies, setMovies, input, setInput, filterdMovies, setFilteredMovies }) => {
  const [title, setTitle] = useState("")
  const [year, setYear] = useState("")
  const [director, setDirector] = useState("")
  const [rating, setRating] = useState("")
  const [plot, setPlot] = useState("")
  const [sucessMessage, setSuccessMessage] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (
      title.length === 0 ||
      year.length === 0 ||
      director.length === 0 ||
      rating.length === 0 ||
      plot.length === 0
    )
      return

    const newMovie = {
      title,
      year,
      director,
      imdb: { rating },
      plot,
    }

    fetch(`${backendUrl}/api/v1/movies`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMovie),
    })
      .then((res) => res.json())
      .then((data) => setMovies([data, ...movies]))

    setTitle("")
    setYear("")
    setDirector("")
    setRating("")
    setPlot("")

    setSuccessMessage(true)

    const successTimeout = setTimeout(() => setSuccessMessage(false), 3000)

    return () => clearTimeout(successTimeout)
  }

  return (
    <>
      <Header
        movies={movies}
        setMovies={setMovies}
        input={input}
        setInput={setInput}
        filterdMovies={filterdMovies}
        setFilteredMovies={setFilteredMovies}
      />
      <Hero />
      <section className="pt-12 bg-green-dark py-12 px-12 min-h-[700px]">
        <h1 className="font-bold text-2xl text-light-red mb-8 mt-10">Add your own movie</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-9/12 m-auto pb-8">
          <input
            className="py-1 px-2 rounded-2xl border-petrol border-2 bg-green-dark text-petrol placeholder:text-petrol"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="py-1 px-2 rounded-2xl border-petrol border-2 bg-green-dark text-petrol placeholder:text-petrol"
            type="number"
            step={1}
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <input
            className="py-1 px-2 rounded-2xl border-petrol border-2 bg-green-dark text-petrol placeholder:text-petrol"
            type="text"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
          <input
            className="py-1 px-2 rounded-2xl border-petrol border-2 bg-green-dark text-petrol placeholder:text-petrol"
            type="number"
            placeholder="Rating (1-10)"
            min={1}
            max={10}
            step={0.1}
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />{" "}
          <textarea
            className="h-24 py-1 px-2 rounded-2xl border-petrol border-2 bg-green-dark text-petrol placeholder:text-petrol"
            type="text"
            placeholder="Description"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
          />
          <button className="bg-petrol text-white p-2 rounded-full mt-4 ">Submit</button>
        </form>
        {sucessMessage && (
          <p className="text-petrol text-center mt-4 font-bold">Film successfully created</p>
        )}
      </section>
      <Footer />
    </>
  )
}

export default AddNewMovie
