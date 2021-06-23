
let finalDate = new Date("06/25/2021 00:00:00").getTime();
// let tripDate = document.getElementById('trip-date').value;
// let finalDate = tripDate;


function countdown() {
  let n = setInterval(function () {
    let now = new Date().getTime();
    let selectedDate = document.getElementById('trip-date').value;
    let userDate = new Date(selectedDate).getTime();

    let distance = userDate - now;

    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('clock').innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (distance < 0) {
      clearInterval(n);
      document.getElementById('clock').innerHTML = "Countdown is Over!"
    }
  }, 1000);
}

document.getElementById('time-submit').onclick = function () {
  countdown();

}

export { countdown }