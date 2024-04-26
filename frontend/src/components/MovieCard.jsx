const MovieCard = ({ movie }) => {
  return (
    <div className="text-white flex flex-col">
      <img className="mb-2" src="/images/movie.jpg" alt="Movie Image" />
      <p className="font-bold">{movie.title}</p>
      <p className="text-petrol">{movie.director}</p>
    </div>
  )
}

export default MovieCard
