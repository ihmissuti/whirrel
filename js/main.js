var net = new brain.NeuralNetwork();
var longest = 400;

function encode(arg) {
  return arg.split('').map(x => (x.charCodeAt(0) > 255 ? 0.1: x.charCodeAt(0) / 255));
}
function getPrediction(title) {
      var result = net.run(encode(adjustSize(title, 280)));
      return {
        views: result.views*1597273,
        engagements: result.engagements*14056
      }
  }


  function adjustSize(string) {
      
      while (string.length < longest) {
        string += ' ';
      }
      return string;  
  }
  $('form').submit(async function(){
    $( "#containerA" ).removeClass( "winner" );
    $( "#containerB" ).removeClass( "winner" );
    $( "#result" ).html("");
    $( "#scoreA" ).html("");
    $( "#scoreB" ).html("");
    var titleA = $('#titleA').val()
    var titleB = $('#titleB').val()
    sa_event("prediction");

    net.fromJSON(staticNet);
    net.toFunction();
    var answer = await getPrediction(titleA)
    var answerB = await getPrediction(titleB)

          $(".results").css("display", "block");
          if (answer.views > answerB.views) {

            $( "#containerA" ).addClass( "winner" );
            $( "#result" ).html( "The winner is title A: " + titleA + ' views' + answer );
          } else {

            $( "#containerB" ).addClass( "winner" );
            $( "#result" ).html( "The winner is title B: " + titleB + ' views ' + answerB);
          }

          $( "#scoreA" ).html(answer.views.toFixed(0))
          $( "#scoreB" ).html(answerB.views.toFixed(0))
          $( "#engagementsA" ).html(answer.engagements.toFixed(0))
          $( "#engagementsB" ).html(answerB.engagements.toFixed(0))

  })