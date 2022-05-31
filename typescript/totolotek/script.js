var Lotto = (function () {
    function Lotto() {
        this.refresh();
    }
    Lotto.prototype.refresh = function () {
        this.zest = parseInt(document.getElementById('zestaw').value);
        this.losy = parseInt(document.getElementById('losy').value);
        var szansa = this.silnia(this.zest, this.losy) /
            this.silnia(this.zest - this.losy, 0);
        document.getElementById('szansa').innerHTML = "Szansa wylosowania: 1 do "
            + szansa.toFixed(0);
    };
    Lotto.prototype.silnia = function (N, K) {
        var s = 1;
        while (N > K) {
            s *= N;
            N--;
        }
        return s;
    };
    return Lotto;
})();
var lotto = new Lotto();
