import { faker } from '@faker-js/faker'
import CreateRandomUser from './CreateRandomUser'

export default function CreateRandomPost() {
    const author = CreateRandomUser()
    const mention = CreateRandomUser()

    return {
    id: faker.string.uuid(),
    author,
    movie: faker.lorem.words(Math.floor(Math.random() * 4) + 1),
    movieURL: faker.image.urlPlaceholder(),
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