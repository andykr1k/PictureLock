import './App.css'

export default function App() {
  return (
    <div class="flex items-center justify-center h-screen bg-gray-200">
      <div class="container">
        <div class="bg-white rounded-lg shadow-lg p-10 md:p-20 mx-2">
          <div class="text-center">
            <h2 class="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
              Picture<span class="text-indigo-600">Lock</span>
            </h2>
            <h3 class='text-xl md:text-3xl mt-10'>Under Construction...</h3>
            <p class="text-md md:text-xl mt-10">Unlock the Power of Film with AI: Your Ultimate Social Hub for Movie Enthusiasts.</p>
          </div>
          <div class="flex flex-wrap mt-10 justify-center">
            <div class="m-3">
              <a target='_blank' href="https://www.instagram.com/picturelockapp" title="Quicktoolz On Facebook"
                class="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-blue-600 hover:border-blue-600 hover:bg-blue-600 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                <span class="mx-auto">Instagram</span>
              </a>
            </div>
            <div class="m-3">
              <a target='_blank' href="https://www.github.com/andykr1k/picturelock" title="Quicktoolz On Facebook"
                class="md:w-32 bg-white tracking-wide text-gray-800 font-bold rounded border-2 border-purple-500 hover:border-purple-500 hover:bg-purple-500 hover:text-white shadow-md py-2 px-6 inline-flex items-center">
                <span class="mx-auto">Github</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}