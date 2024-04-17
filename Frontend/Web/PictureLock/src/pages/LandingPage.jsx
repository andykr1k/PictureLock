export default function LandingPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="container mx-10">
        <div className="text-center">
          <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            Picture<span className="text-indigo-600">Lock</span>
          </h2>
          <p className="text-md md:text-xl mt-10 text-white">
            Unlock the Power of Film with AI: Your Ultimate Social Hub for Movie
            Enthusiasts.
          </p>
        </div>
        <div className="flex flex-wrap mt-4 justify-center">
          <div className="m-3">
            <a
              target="_blank"
              href="https://www.instagram.com/picturelockapp"
              title="Quicktoolz On Facebook"
              className="md:w-32 tracking-wide text-white font-bold rounded border-2 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
            >
              <span className="mx-auto">Instagram</span>
            </a>
          </div>

          <div className="m-3">
            <a
              target="_blank"
              href="https://www.github.com/andykr1k/picturelock"
              title="Quicktoolz On Facebook"
              className="md:w-32 tracking-wide text-white font-bold rounded border-2 border-purple-500 hover:border-purple-500 hover:bg-purple-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center"
            >
              <span className="mx-auto">Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
