import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa6"
import Search from "./Search"

const Header = ({ movies, input, setInput, setFilteredMovies }) => {
  return (
    <header className="flex items-center justify-between py-6 px-8 bg-green-dark">
      <div className="flex items-center gap-4 text-petrol font-bold">
        <Link onClick={() => setFilteredMovies([])} to="/">
          MMDb
        </Link>
        <Link to="/favs">
          <FaStar color="#E9C46A" />
        </Link>
      </div>
      <Search
        movies={movies}
        input={input}
        setInput={setInput}
        setFilteredMovies={setFilteredMovies}
      />
      <Link to="/movies/newMovie" className="text-petrol cursor-pointer">
        Add your own
      </Link>
    </header>
  )
}

export default Header
