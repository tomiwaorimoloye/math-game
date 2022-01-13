// start timer function
const timeStamp = document.getElementById("time");
const timeResult = document.getElementById("time-stamp");

let [hours, minutes, seconds] = [0, 0, 0];
let interval;

function startTimer() {
	interval = setInterval(displayTimer, 1000);
}

// update the html
function displayTimer() {
	seconds++;
	if (seconds == 60) {
		seconds = 0;
		minutes++;
		if (minutes == 60) {
			minutes = 0;
			hours++;
		}
	}

	// update html
	timeStamp.innerHTML = createTimeString(hours, minutes, seconds, true);
}

function createTimeString(h, m, s, check = false) {
	if (check) {
		// customise string
		h = h < 10 ? "0" + h : h;
		m = m < 10 ? "0" + m : m;
		s = s < 10 ? "0" + s : s;
	}

	return `${h}:${m}:${s}`;
}

function endTimer() {
	let savedTimeArray = timeStamp.innerHTML.split(":");
	clearInterval(interval);
	[hours, minutes, seconds] = [0, 0, 0];
	timeStamp.innerHTML = "00:00:00";

	// show result time
	timeResult.innerHTML = createTimeString(...savedTimeArray);
}

export { startTimer, endTimer };
