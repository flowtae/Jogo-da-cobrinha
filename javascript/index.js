const musicaDefundo = new Audio("music/LEOESTONDA.MP3")
const musicaGameOver = new Audio("music/gameover.mp3");
const musicaMover = new Audio("music/move.mp3");
const somComer = new Audio("music/gggg.mp3")



var direcao = {x:0, y:0};
var cobrinha = [
    {
        x: Math.floor(Math.random() * 18),
        y: Math.floor(Math.random() * 18)
    }
]
var fruta = 
    {
        x: Math.floor(Math.random() * 18),
        y: Math.floor(Math.random() * 18)
    }

var pontos = 0;

var ultimaVezAtualizada = 0;
var VELOCIDADE = 0.5;


function principal(tempoAtual) {
    window.requestAnimationFrame(principal);
    if ((tempoAtual - ultimaVezAtualizada) / 100 < 1 / VELOCIDADE) {
        return;
    }
    ultimaVezAtualizada = tempoAtual;

    atualizaGame();
}

function verificarColisao(){
    //colisão com ela mesma
for(var i = 1; i < cobrinha.length; i++){
    if(cobrinha[i].x == cobrinha[0].x && cobrinha[1].y == cobrinha[0].y){
        return true;
    }

}
//verifica colisão com paredes
if(cobrinha[0].x >= 18|| cobrinha[0].x <= 0 || cobrinha[0].y >= 18 || cobrinha[0].y <= 0){
    return true;
}
return false;

}
function atualizaGame() {

    var colidiu = verificarColisao();
    if(colidiu == true){
        musicaDefundo.pause();
        musicaGameOver.play();
        alert ("GAME OVER TONGÃOOOO")
        cobrinha = [{x: 5, y:5}]
        direcao.x = 0;
        direcao.y = 0;
        pontos = 0;
        
    }
    
    verificarComeuFrutinha();


    for (var i = cobrinha.length - 2; i >= 0; i--){
        cobrinha[i + 1] = {...cobrinha[i]}
      }
cobrinha[0].y += direcao.y;
cobrinha[0].x += direcao.x;
    board.innerHTML = "";
    for (var i = 0; i < cobrinha.length; i++) {
        var parteCobrinha = document.createElement('div');
        parteCobrinha.style.gridRowStart = cobrinha[i].y;
        parteCobrinha.style.gridColumnStart = cobrinha[i].x;
        

        if (i == 0) {
            parteCobrinha.classList.add("head");
        } else {
            parteCobrinha.classList.add("snake");
        }
        board.appendChild(parteCobrinha);
    }
    var food = document.createElement("div");
    food.style.gridColumnStart = fruta.x;
    food.style.gridRowStart = fruta.y;
    food.classList.add("fruta")
    board.appendChild(food);
}
function verificarComeuFrutinha(){
       
    if(cobrinha[0].x == fruta.x && cobrinha[0].y == fruta.y){
        somComer.play();
        pontos = pontos + 10;
        pontuacao.innerHTML = pontos + " pontos"
        fruta = 
        {
            x: Math.floor(Math.random() * 18),
            y: Math.floor(Math.random() * 18)
        }
        cobrinha.unshift({x: cobrinha[0].x + direcao.x, y: cobrinha[0].y + direcao.y})
        fruta.x =  Math.floor(Math.random() * 16) + 1
        fruta.y = Math.floor(Math.random() * 16) + 1
        velocidade = velocidade + 0.5;
        
    }
}
    function movimento (e){

    direcao.x = 0
    direcao.y = 1
    musicaMover.play();

  
    switch(e.code){

        case "KeyW":
             direcao.x = 0 ;
             direcao.y= -1;
            break;
    
            case "KeyS":
                direcao.x = 0;
                direcao.y = 1;
            
               break;
               case "KeyA":
                   direcao.x= -1;
                   direcao.y= 0;
            
                   break;
                   case "KeyD":
                       direcao.x = 1;
                       direcao.y = 0;

                       case "Enter":
                        direcao.x = 1;
                        direcao.y = 0;
                        musicaDefundo.play();
            
                       break

    }
}



window.addEventListener('keydown', (e) => movimento(e))










principal();