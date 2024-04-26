import { Link } from "react-router-dom"
import { FaStar } from "react-icons/fa6"

const Header = () => {
  return (
    <header className="flex items-center justify-between py-6 px-8 bg-green-dark">
      <div className="flex items-center gap-4 text-petrol font-bold">
        <Link to="/">MMDb</Link>
        <Link to="/favs">
          <FaStar color="#E9C46A" />
        </Link>
      </div>
      <form className="flex gap-2 items-center">
        <input
          className="border-2 py-1 px-3 rounded-full border-petrol bg-[#274653] placeholder:text-[#2B9D8F] text-petrol outline-none"
          type="text"
          name="userInput"
          id="userInput"
          placeholder="e.g. The Godfather "
        />
        <button
          className="text-white border-petrol border-2 rounded-full px-4 py-1 bg-petrol"
          type="submit">
          Submit
        </button>
      </form>
      <Link to="/movies/newMovie" className="text-petrol cursor-pointer">
        Add your own
      </Link>
    </header>
  )
}

export default Header
