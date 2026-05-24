window.onload = function(){
    
    function updateClock(){
        const clock = document.querySelector(".clock");
        const now = new Date();
        const hh = String(now.getHours()).padStart(2, '0');
        const mm = String(now.getMinutes()).padStart(2, '0');
        clock.innerHTML = `${hh}:${mm}`;
    }

    function updateDate(){
        const date = document.getElementById("date");
        const now = new Date();
        const mm = String(now.getMonth()).padStart(2,"0");
        const dd = String(now.getDate()).padStart(2,"0");
        date.textContent = `${mm} ${dd}`;
    }

    let hasElapsed = 0;
    let StartTime = new Date();
    let running = true;
    let hasClicked = null;
    let stopwatchEl = document.getElementById("watch");

    function formatTime(ms){
        const time = Math.floor(ms / 1000);
        const hh = String(Math.floor(time / 3600)).padStart(2, '0');
        const mm = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
        const ss = String(time % 60).padStart(2, '0');
        if(hh == "00") return `${mm}:${ss}`;
        else return `${hh}:${mm}`
    }

    function updateStopwatch(){
        if(running)stopwatchEl.textContent = formatTime(hasElapsed+(Date.now()-StartTime))
    }

    function stopwatch(){
        stopwatchEl.textContent = formatTime(hasElapsed+(Date.now()-StartTime));
    }

    function stop(){ 
        if (!running) return;
        hasElapsed += Date.now() - StartTime;
        running = false;
    }

    function resume() {
        if (running) return;
        running = true;
        StartTime = Date.now();
    }

    function reset() {
        hasElapsed = 0;
        StartTime = Date.now();
        running = true;
        stopwatchEl.textContent = "00:00";
    }

    stopwatchEl.addEventListener('click', () => {
        clearTimeout(hasClicked);
        setTimeout(() => {
        if (running) stop();
        else resume();
        }, 500);
    });

    stopwatchEl.addEventListener('dblclick', () => {
        clearTimeout(hasClicked);
        reset();
    });

    updateClock();
    updateDate();
    updateStopwatch();
    setInterval(updateClock, 1000);
    setInterval(updateStopwatch, 1000);
    setInterval(updateClock, 60000);
}