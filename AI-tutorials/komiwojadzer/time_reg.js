class TimeRegister {
    constructor(n){
       this.timers = new Array(n);
       this.timeStart = new Array(n);
       for(let i = 0; i < n; i++) {
        this.timers[i] = 0;
       }
    }
    start(id){
        this.timeStart[id] = Date.now();
    }
    stop(id){
        this.timers[id] += Date.now() - this.timeStart[id];
    }
    getTime(id){
        return this.timers[id]/1000;
    }
}


exports.TimeRegister = TimeRegister;