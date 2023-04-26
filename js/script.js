const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameover = document.querySelector('.gameover');
const restart = document.querySelector('.restart');
const inicio = document.querySelector('.inicio');


const audioGameOver = new Audio();
    audioGameOver.src = './sound/gameover.mp3';
    audioGameOver.loop = false;



 function telaInicial(){
     // Classe pipe removida e adicionada a classe pipe-parado, sem animação 
     pipe.classList.remove('pipe');
     pipe.classList.add('pipe-parado'); 
     pipe.style.right = '130px';

 }   
    

// Cria um elemento para exibir o tempo decorrido
let contador = document.createElement("score");
contador.classList.add('score');
document.body.appendChild(contador);

let tempo = 0;
let cronometro;

// Funções do cronômetro       
function timer(){
    tempo++;
    contador.innerText = tempo;
}

function start(){
    cronometro = setInterval(() => {
        timer();
    }, 100);
}

function pause(){
    clearInterval(cronometro);
}

function reset(){
    tempo = 0;
    contador.innerText = tempo;
}

 // Cria o elemento hiscore

let HighScore = document.createElement("hscore");
HighScore.classList.add('hscore');
document.body.appendChild(HighScore); 
HighScore.innerHTML = 0;

// Configuração do pulo 

const jump = () => {
    mario.classList.add('jump');

    setTimeout(() => {
        
        mario.classList.remove('jump');

    }, 500);

}

  function reiniciarJogo() {
    // Reiniciar a contagem, imagem de game over e reset saírem da tela, mario voltar a caminhar e cano voltar a animação
   
    // Cano
    // Estilo left é resetado, a classe pipe-parado é removida e a classe pipe é adicionada novamente
    pipe.style.left = '';
    pipe.classList.remove('pipe-parado');   
    pipe.classList.add('pipe');

    // Game over e reset
    gameover.src = '';
    restart.style.visibility = 'hidden';
    

    // Mario
    mario.src = './img/mario-walking.gif';
    mario.style.width = '';
    mario.style.marginLeft = '';
    mario.style.bottom = 0;
    mario.classList.remove('mario-gameover');

    reset();
    start();

    inicio.style.visibility = 'hidden';

}

// Definições para o fim do jogo 

const fimDoJogo = setInterval(() => {
 
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
   
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 90) {

        // Classe pipe removida e adicionada a classe pipe-parado, sem animação 
        pipe.classList.remove('pipe');
        pipe.classList.add('pipe-parado'); 
        // A esquerda é a posição do cano na hora do encontro com o mario
        pipe.style.left = `${pipePosition}px`;
       
       
        mario.style.bottom = `${marioPosition}px`;
        mario.src = './img/gameover.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        mario.classList.add('mario-gameover');

        // audioGameOver.play()
        

        gameover.src = './img/game_over.png';
        restart.style.visibility = 'visible';
        
        clearInterval();
        pause();
        
        // Criando a Highscore 
        if (tempo > HighScore.innerHTML) {
            HighScore.innerHTML = tempo;
        }
    }

}, 10);


HighScore.innerHTML = "";


document.addEventListener('keydown', jump);
