import { faker } from '@faker-js/faker'

function CreateRandomFollower() {
    const fName = faker.person.firstName()
    const lName = faker.person.lastName()
    return {
        id: faker.string.uuid(),
        image: faker.image.avatar(),
        name: fName + " " + lName,
        verified: Math.random >= 0.75,
        bio: faker.person.bio(),
        username: faker.internet.userName({fName, lName}),
        link: faker.internet.url()
    }
}

export default function CreateRandomUser() {
    const fName = faker.person.firstName()
    const lName = faker.person.lastName()
    return {
        id: faker.string.uuid(),
        image: faker.image.avatarLegacy(),
        name: fName + " " + lName,
        verified: Math.random >= 0.75,
        bio: faker.person.bio(),
        username: faker.internet.userName({fName, lName}),
        link: faker.internet.url(),
        followers: new Array(Math.floor(Math.random() * 10)).fill(null).map((_)=> CreateRandomFollower())
    }
}