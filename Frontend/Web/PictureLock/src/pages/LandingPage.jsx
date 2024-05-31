export default function LandingPage() {
  return (
    <div className="flex items-center justify-center h-[100dvh]">
      <div className="container mx-10 z-50">
        <div className="text-center">
          <div className="flex justify-center">
            <img className="w-48" src="./logo.png" />
          </div>
          <h2 className="text-4xl tracking-wide leading-10 font-extrabold text-white sm:text-5xl sm:leading-none md:text-6xl">
            Picturelock
          </h2>
          <p className="text-md md:text-xl ios:mt-10 text-white">
            Discover what to watch in an instant. A social platform for all
            cinema and television consumers.
          </p>
        </div>
        <div className="flex flex-wrap mt-4 justify-center">
          <div className="m-3">
            <a
              target="_blank"
              href="https://www.instagram.com/picturelockapp"
              title="Quicktoolz On Facebook"
              className="md:w-32 tracking-wide text-white font-bold rounded border-2 border-orange-fruit hover:border-orange-fruit hover:bg-orange-fruit hover:text-white shadow-md py-2 px-4 inline-flex items-center"
            >
              <span className="mx-auto">Instagram</span>
            </a>
          </div>

          <div className="m-3">
            <a
              target="_blank"
              href="https://www.github.com/andykr1k/picturelock"
              title="Quicktoolz On Facebook"
              className="md:w-32 tracking-wide text-white font-bold rounded border-2 border-orange-fruit hover:border-orange-fruit hover:bg-orange-fruit hover:text-white shadow-md py-2 px-6 inline-flex items-center"
            >
              <span className="mx-auto">Github</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
