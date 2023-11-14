const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameover = document.querySelector('.gameover');
const restart = document.querySelector('.restart');
const inicio = document.querySelectorAll('.inicio');
let audioPlayed = false; 
let duration = 2; 



// Musica de fundo
const themeAudio = new Audio();
themeAudio.src = './sound/theme.mp3';
themeAudio.loop = true;

// Som do game over
const audioGameOver = new Audio();
audioGameOver.src = './sound/gameover.mp3';

// Som do pulo
const audioJump = new Audio();
audioJump.src = './sound/jump.mp3';


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

let tempo = 0.1;
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

let HI = document.createElement("HI");
HI.classList.add('HI');
document.body.appendChild(HI); 

// Configuração do pulo 
const jump = () => {
    mario.classList.add('jump');
    audioJump.play();
    console.log('pulei');

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

    inicio.forEach(element => {
        element.style.visibility = 'hidden';
    });

    // Musica
    themeAudio.currentTime = 0; // Volta para o início
    themeAudio.play();
    audioPlayed = false; // Atualiza a variável de controle

    // Duração da animação
    duration = 5;

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
   
        gameover.src = './img/game_over.png';
        restart.style.visibility = 'visible';
        
        clearInterval();
        pause();

        if (!audioPlayed) {
            audioGameOver.play();
            audioGameOver.loop = false;
            audioPlayed = true; // Atualiza a variável de controle
            console.log('gameover');
        }

        themeAudio.pause();
        
        // Criando a Highscore 
        if (tempo > HighScore.innerHTML) {
            HI.innerHTML = 'HI ';
            HighScore.innerHTML = tempo;
        }

    }   
}, 10);

HighScore.innerHTML = "";
HI.innerHTML = "";

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump()
    }
});


let lastTimestamp = null;

function updateAnimationDuration(timestamp) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }
    console.log(duration);
    const elapsedMilliseconds = timestamp - lastTimestamp;
    const elapsedSeconds = elapsedMilliseconds / 1000;

    if (tempo % 0.5 === 0 && duration > 2) {
        duration -= 0.1 * elapsedSeconds;
        console.log(tempo);
        console.log(duration);
    }

    pipe.style.animationDuration = `${duration}s`;

    lastTimestamp = timestamp;

    requestAnimationFrame(updateAnimationDuration);
}

requestAnimationFrame(updateAnimationDuration);
