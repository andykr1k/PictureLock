export default function TimeAgo(time) {
    const now = new Date()

    const diffInMins = now.getTime() - new Date(time).getTime()

    const diffInSecs = Math.floor(diffInMins/1000);
    const diffInMs = Math.floor(diffInSecs/60);
    const diffInHrs = Math.floor(diffInMs/60);
    const diffInDays = Math.floor(diffInHrs/24);

    if ( diffInSecs < 60){
        return diffInSecs + "s";
    } else if ( diffInMs < 60){
        return diffInMs + "mins";
    } else if ( diffInHrs < 24){
        return diffInHrs + "hrs";
    } else if ( diffInDays == 1){
        return "yesterday";
    } else {
        return diffInDays + "days"
    }

}