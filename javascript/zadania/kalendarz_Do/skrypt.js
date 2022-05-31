
    var y = (new Date()).getFullYear();
    var cristmas = new Date(y, 11, 25, 0, 0, 0);

  function timeToCristmas(){

    var now = new Date();
    var nowTime = now.getTime();

    //console.log("cristmas: " + cristmasTime);
    //console.log("time now: " + nowTime);

    var dateArr = timeDistance(now, cristmas);

    document.getElementById("months").innerHTML = dateArr[1];
    document.getElementById("days").innerHTML = dateArr[2];
    document.getElementById("hours").innerHTML = dateArr[3];
    document.getElementById("minutes").innerHTML = dateArr[4];
    document.getElementById("seconds").innerHTML = dateArr[5];
    document.getElementById("calItemSec").querySelectorAll('img')[0].setAttribute('class','animated');
    setTimeout(function(){
      document.getElementById("calItemSec").querySelectorAll('img')[0].removeAttribute('class');
    }, 200);
  }


  function timeDistance(startDate, endDate){
    var dateArr = [0,0,0,0,0,0];
    dateArr[0] = endDate.getFullYear() - startDate.getFullYear();
    dateArr[1] = endDate.getMonth() - startDate.getMonth();
    dateArr[2] = endDate.getDate() - startDate.getDate();
    dateArr[3] = endDate.getHours() - startDate.getHours();
    dateArr[4] = endDate.getMinutes() - startDate.getMinutes();
    dateArr[5] = endDate.getSeconds() - startDate.getSeconds();
    console.log(dateArr[5]);
    if(dateArr[5] < 0) {
      dateArr[4]--;
      dateArr[5] += 60;
    }
    if(dateArr[4] < 0) {
      dateArr[3]--;
      dateArr[4] += 60;
    }
    if(dateArr[3] < 0) {
      dateArr[2]--;
      dateArr[3] += 24;
    }
    var daysOfM = [31,28,31,30,31,30,31,31,30,31,30,31];
    var days = daysOfM[startDate.getMonth()];
    if(startDate.getFullYear() % 4 == 0 & startDate.getMonth() == 1) days++;
    if(dateArr[2] < 0) {
      dateArr[1]--;
      dateArr[2] += 30;
    }
    if(dateArr[1] < 0) {
      dateArr[0]--;
      dateArr[1] += 12;
    }
    return dateArr;
  }

setInterval(timeToCristmas, 1000);
