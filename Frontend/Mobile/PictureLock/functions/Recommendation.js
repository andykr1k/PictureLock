import axios from 'axios';

export async function Recommendation(film_type, movie, platforms) {
    const base = 'http://ec2-3-145-200-102.us-east-2.compute.amazonaws.com:8080/recommend/'
    const url = base + film_type +'/' + movie + '/' + platforms
    var r = await axios.get(url)
        .catch(error=>console.log(error))
        .then(function (response) {return response.data.recommendations;})
    return r;
}