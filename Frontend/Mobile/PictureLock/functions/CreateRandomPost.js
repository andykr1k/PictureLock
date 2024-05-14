import { faker } from '@faker-js/faker'
import CreateRandomUser from './CreateRandomUser'

const data = [
  {
    movie: "Friends",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/2koX1xLkpTQM4IZebYvKysFW1Nh.jpg",
  },
  {
    movie: "Barbie",
    movieURL:
      "https://upload.wikimedia.org/wikipedia/en/0/0b/Barbie_2023_poster.jpg",
  },
  {
    movie: "Game of Thrones",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1XS1oqL89opfnbLl8WnZY1O1uJx.jpg",
  },
  {
    movie: "How I Met Your Mother",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/b34jPzmB0wZy7EjUZoleXOl2RRI.jpg",
  },
  {
    movie: "Elemental",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/8riWcADI1ekEiBguVB9vkilhiQm.jpg",
  },
  {
    movie: "Flash",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
  },
  {
    movie: "Fast X",
    movieURL:
      "https://www.themoviedb.org/t/p/w440_and_h660_face/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  },
  {
    movie: "Avatar",
    movieURL:
      "https://image.tmdb.org/t/p/original/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
  },
  {
    movie: "Kingdom of the Planet of the Apes",
    movieURL:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
  },
];

export default function CreateRandomPost() {
    const author = CreateRandomUser()
    const mention = CreateRandomUser()
    const movie = data[0]
    
    return {
    id: faker.string.uuid(),
    author,
    movie: movie.movie,
    movieURL: movie.movieURL,
    reaction: faker.internet.emoji(),
    comments: new Array(Math.floor(Math.random() * 10)).fill(null).map(()=>({
        id: faker.string.uuid(),
        author: CreateRandomUser(),
        content: faker.lorem.sentence(),
        likes: Math.floor(Math.random() * 100) + 1,
        createdAt: faker.date.recent().toISOString(),
    })),
    numberOfLikes: Math.floor(Math.random() * 100) + 1,
    impressions: Math.floor(Math.random() * 1000) + 1,
    createdAt: faker.date.recent().toISOString(),
    review: faker.lorem.paragraph(),
    mention,
    stars: Math.floor(Math.random() * 5) + 1
  }
}