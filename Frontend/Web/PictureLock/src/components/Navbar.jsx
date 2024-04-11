export default function Navbar() {
    return (
      <nav className="absolute flex flex-row items-center h-16 px-4 backdrop-filter backdrop-blur-sm/tint-10 justify-between w-full md:px-6 lg:items-stretch lg:flex-row xl:container/width-2">
        <a className="flex items-center font-semibold hover:text-blue-600" href="/">
          PictureLock
        </a>
        <nav className="flex items-center gap-4 ml-auto">
          <a
            className="flex items-center text-sm font-medium hover:text-blue-600"
            href="/"
          >
            Home
          </a>
          <a
            className="flex items-center text-sm font-medium hover:text-blue-600"
            href="/recommend"
          >
            Beta
          </a>
          <a
            className="flex items-center text-sm font-medium hover:text-blue-600"
            href="/roadmap"
          >
            Roadmap
          </a>
        </nav>
      </nav>
    );
}