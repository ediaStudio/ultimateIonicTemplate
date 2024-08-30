// distance is in ms
export function setCountDown(distance: number) {

    // Time calculations for days, hours, minutes and seconds
    // let days = Math.floor(distance / (1000 * 60 * 60 * 24)).toString();
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString();
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString();
    let seconds = Math.floor((distance % (1000 * 60)) / 1000).toString();

    // days = days.length === 1 ? '0' + days : days;
    hours = hours.length === 1 ? '0' + hours : hours;
    minutes = minutes.length === 1 ? '0' + minutes : minutes;
    seconds = seconds.length === 1 ? '0' + seconds : seconds;

    // If the count down is over, write some text
    if (distance < 0) {
        return '00:00';
    }
    const result = `${hours}:${minutes}:${seconds}`;
    if (result === '00:00:00') {
        return '';
    }
    if (hours === '00') {
        return `${minutes}:${seconds}`
    } else {
        return result;
    }
}

