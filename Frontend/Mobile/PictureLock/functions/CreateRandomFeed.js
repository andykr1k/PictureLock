import CreateRandomPost from './CreateRandomPost'

export default function CreateRandomFeed() {
    return new Array(10).fill(null).map((_)=> CreateRandomPost());
}