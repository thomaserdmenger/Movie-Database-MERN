import { useNavigate } from "react-router-dom"

const Search = ({ movies, input, setInput, setFilteredMovies }) => {
  //   const [toggle, setToggle] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (input.length === 0) return

    const filter = movies.filter((movie) => movie.title.toLowerCase().includes(input.toLowerCase()))

    setFilteredMovies(filter)
    setInput("")
    navigate("/")
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center">
      <input
        className="border-2 py-1 px-3 rounded-full border-petrol bg-[#274653] placeholder:text-[#2B9D8F] text-petrol outline-none"
        type="text"
        name="userInput"
        id="userInput"
        placeholder="e.g. The Godfather"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="text-white border-petrol border-2 rounded-full px-4 py-1 bg-petrol"
        type="submit">
        Submit
      </button>
    </form>
  )
}

export default Search
