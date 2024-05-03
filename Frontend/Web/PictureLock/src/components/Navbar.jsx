export default function Navbar() {
    return (
      <nav className="absolute flex flex-row items-center h-16 px-4 backdrop-filter backdrop-blur-sm/tint-10 justify-between w-full md:px-6 lg:items-stretch lg:flex-row xl:container/width-2 text-white">
        <a
          className="flex items-center font-semibold hover:text-orange-fruit md:text-lg"
          href="/"
        >
          PictureLock
        </a>
        <nav className="flex items-center gap-4 ml-auto">
          <a className="group relative" href="/">
            <span className="relative inline-block items-center text-sm font-medium hover:text-orange-fruit md:text-lg">
              Home
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full bg-orange-fruit" />
          </a>
          <a className="group relative" href="/recommend">
            <span className="relative inline-block items-center text-sm font-medium hover:text-orange-fruit md:text-lg">
              Beta
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full bg-orange-fruit" />
          </a>
          <a className="group relative" href="/roadmap">
            <span className="relative inline-block items-center text-sm font-medium hover:text-orange-fruit md:text-lg">
              Roadmap
            </span>
            <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover:w-full bg-orange-fruit" />
          </a>
        </nav>
      </nav>
    );
}