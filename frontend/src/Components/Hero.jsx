export default function Hero() {
  return (
    <section className="pt-32 pb-20 bg-[#0b0c14] relative min-h-screen bg-real max-w-full lg:bg-contain bg-no-repeat grid place-items-center">
      <div className="container mx-auto px-4 text-white text-center">
        <h1 className="text-4xl font-bold font-inter mb-6">ඞitty.</h1>
        <h1 className="text-6xl font-bold font-inter mb-6">Real-time Data Visualization <br /> for your Github</h1>
        <div className="w-full relative grid grid-cols-1 place-items-center">
          <div className="w-1/2">
            <p className="text-xl mb-8 font-inter">Ship higher-quality software faster. Be the hero of your engineering teams.
              <br /> Make coding more fun agen
            </p>
          </div>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-space mb-4">Start for free</button>
        <p className="text-l mt-8 font-space">Start Viewing activites for free or <a href="#" className="text-blue-600">check out a demo</a></p>
      </div>
    </section>

  )
}

