const Hero = () => {
  return (
    <section
      className={`h-[400px] w-full bg-hero-pattern bg-no-repeat bg-cover bg-center flex justify-center`}>
      <div className="flex flex-col max-w-4xl font-bold text-4xl text-light-red mt-10">
        <h1 className="mb-2">MovieMagicDatabase hast it all.</h1>
        <h2>But you can still add to it.</h2>
      </div>
    </section>
  )
}

export default Hero
