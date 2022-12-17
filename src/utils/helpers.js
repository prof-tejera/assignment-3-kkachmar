// Add helpers here. This is usually code that is just JS and not React code. Example: write a function that
// calculates number of minutes when passed in seconds. Things of this nature that you don't want to copy/paste
// everywhere.

// https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
export function timeMath(milliseconds) {
    if(milliseconds>-1){
        const hours = Math.floor(milliseconds/3600000);
        const minutes = Math.floor((milliseconds%3600000)/60000);
        const seconds = Math.floor(((milliseconds%3600000)%60000/1000));
        const ms = Math.floor(((milliseconds%3600000)%60000%1000));
        
       return String(hours).padStart(2, '0')+":"+String(minutes).padStart(2, '0')+":"+String(seconds).padStart(2, '0')+":"+String(ms).padStart(2, '0').substring(0,2);
    }
    return "00:00:00:00"
}

export function makeTimes() {
    var options = []
    var x = 0;
    while (x <= 3600000) {
      options.push({ms: x, display: timeMath(x).substring(0,8)});
      x = x+15000;
    }
    return options;
  }

export function makeSets() {
    var options = []
    var x = 1;
    while (x <= 30) {
      options.push({sets: x, display: x});
      x = x+1;
    }
    return options;
  }

export function updateUrl(timerArray) {
    const newState = btoa(JSON.stringify(timerArray));
    return(newState);
  }