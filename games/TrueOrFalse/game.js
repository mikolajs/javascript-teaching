
class Game {
  constructor(){

  }
  selectAnswer(elem){
    this._setNotCheckedAnswers();
    $(elem).removeClass("answer-not-checked").addClass("answer-checked");
    $("#ultimately").show(200);
  }
  revokeAnser(){
    this._setNotCheckedAnswers();
    $("#ultimately").hide(200);
  }

  _setNotCheckedAnswers(){
    $("#False").removeClass("answer-checked").addClass("answer-not-checked");
    $("#True").removeClass("answer-checked").addClass("answer-not-checked");
  }
}
