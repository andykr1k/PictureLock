import CreateRandomPost from './CreateRandomPost'

export default function CreateRandomFeed() {
    return new Array(50).fill(null).map((_)=> CreateRandomPost());
}