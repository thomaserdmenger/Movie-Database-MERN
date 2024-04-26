import { FaHeart } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"
import { FaFacebookSquare } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="flex bg-petrol text-dark-green py-6 justify-around">
      <p className="font-bold">Imprint</p>
      <div className="flex gap-2 items-center">
        <p>Made with love in heart and popcorn in tummy.</p>
        <FaHeart />
      </div>
      <div className="flex items-center gap-2">
        <FaYoutube size={22} />
        <FaFacebookSquare size={22} />
      </div>
    </footer>
  )
}

export default Footer
