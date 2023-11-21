
// Variáveis
const gameBoard = document.querySelector('.game-board');
const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameover = document.querySelector('.gameover');
const restart = document.querySelector('.restart');
const inicio = document.querySelectorAll('.inicio');
const star = document.querySelector('.star');
const jumpDef = document.querySelector('.jump');

const checkAudioTheme = document.querySelector('.checkaudiotheme');
const checkAudioJump = document.querySelector('.checkaudiojump');
const checkAudioGameOver = document.querySelector('.checkaudiogameover');

const radioEasy = document.querySelector('#easy');
const radioMedium = document.querySelector('#medium');
const radioHard = document.querySelector('#hard');

const radioMario = document.querySelector('#mario');
const radioLuigi = document.querySelector('#luigi');

const backgroundEstrela = 'linear-gradient(rgba(241, 92, 231, 0.875), white)';
const backgroundOriginal = 'linear-gradient(rgb(92, 207, 241), white)';

let estrelaAtiva = false;
let audioPlayed = false; 
let duration; 

function mudarPersonagem() {
        mario.style.width = '';
        mario.style.marginLeft = '';
        mario.style.bottom = 0;
        mario.classList.remove('mario-gameover');
    if (radioMario.checked) {
        mario.src = './img/mario-walking.gif';
    }else if (radioLuigi.checked) {
        mario.src = './img/luigi.gif';
    }
}

// Adiciona um evento de mudança para os radio buttons
radioMario.addEventListener('change', mudarPersonagem);
radioLuigi.addEventListener('change', mudarPersonagem);




// Musica de fundo
const themeAudio = new Audio();
themeAudio.src = './sound/theme.mp3';
themeAudio.loop = true;

// Som do game over
const audioGameOver = new Audio();
audioGameOver.src = './sound/playerdown.mp3';

// Som do pulo
const audioJump = new Audio();
audioJump.src = './sound/jump.mp3';

// Som da estrela
const audioStar = new Audio();
audioStar.src = './sound/star.mp3';

// Função para alterar o background
function alterarBackground() {   
    if (!estrelaAtiva) {
        return;
    }
    
    setTimeout(() => {
         gameBoard.style.background = backgroundEstrela;
         setTimeout(() => {
             gameBoard.style.background = backgroundOriginal;
             alterarBackground();
         }, 100);
    }, 100);
 }

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
let velocidade = 100; // 100 milissegundos

// Funções do cronômetro       
function timer(){
    tempo++;
    contador.innerText = tempo;

    // Sua condição para ajustar a velocidade aqui
    if (estrelaAtiva) {
        velocidade = 50;  // por exemplo, diminui a velocidade para 50 milissegundos
    } else {
        velocidade = 100;  // volta à velocidade padrão
    }

    clearInterval(cronometro);
    cronometro = setInterval(timer, velocidade);

}

function start(){
        cronometro = setInterval(() => {
            timer();
        }, velocidade);
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
    
    if (checkAudioJump.checked) {
        audioJump.volume = 0.08;
        audioJump.play();
    }
    
    setTimeout(() => {
        
        mario.classList.remove('jump');

    }, 600);
}

// Reiniciar o jogo
function reiniciarJogo() {

    // Cano
    // Estilo left é resetado, a classe pipe-parado é removida e a classe pipe é adicionada novamente
    pipe.style.left = '';
    pipe.classList.remove('pipe-parado');   
    pipe.classList.add('pipe');

    // Game over e reset
    gameover.src = '';
    restart.style.visibility = 'hidden';

    mudarPersonagem();

    reset();
    start();

    // Esconde a tela inicial
    inicio.forEach(element => {
        element.style.visibility = 'hidden';
    });

    // Musica
    if (checkAudioTheme.checked) {
        themeAudio.currentTime = 0; // Volta para o início
        themeAudio.play();
        audioPlayed = false; // Atualiza a variável de controle
    }

    // Duração da animação

    if (radioEasy.checked) {
        duration = 3.5;
    }

    if (radioMedium.checked) {
        duration = 2.6;
    }

    if (radioHard.checked) {
        duration = 1.8;
    }

    // Estrela
    modoEstrela();

    function ativarEstrela() {
        star.style.display = 'block';
        setTimeout(() => {
            star.style.display = 'none';
        }, 15000);
    }

    ativarEstrela();
    setInterval(ativarEstrela, 25000);
}


// Definiçoes para ativar a estrela  
function modoEstrela() {
    setInterval(() => { 

    const starPositionLeft = star.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
        
    if (starPositionLeft <= 120 && starPositionLeft > 0 && marioPosition > 150 && star.style.display === 'block') {
        estrelaAtiva = true;
        star.style.display = 'none';
        
        if (checkAudioTheme.checked) {
            themeAudio.pause();
            
            audioStar.currentTime = 0; // Volta para o início
            audioStar.volume = 0.4;
            audioStar.play();
            audioPlayed = false; // Atualiza a variável de controle
        }
        
        alterarBackground(); // Altera o background

        timer(); // Aumenta a velocidade do cronômetro

        let duracaoEstrela = 9;
        let contadorEstrela = document.querySelector('.contador-estrela');
        
        function atualizarContador() {
            contadorEstrela.innerHTML = duracaoEstrela;
            duracaoEstrela--;
        
            if (duracaoEstrela < 0) {
                clearInterval(intervalID);  // para o contador quando a contagem regressiva chegar a 0
                contadorEstrela.innerHTML = '';
            }
        }
        
        // Atualiza o contador a cada segundo (1000 milissegundos)
        let intervalID = setInterval(atualizarContador, 1000);        
 
        setTimeout(() => {
            estrelaAtiva = false;
            if (checkAudioTheme.checked) {
                audioStar.pause();
                themeAudio.play();
            }
            
            gameBoard.style.background = backgroundOriginal;
            timer(); // Volta a velocidade do cronômetro
        }, 10000);   
    }
    }, 1);  
}

// Definições para o fim do jogo 
const fimDoJogo = setInterval(() => {
 
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
   
    if (estrelaAtiva) {    
        return;
    }

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

        if (checkAudioGameOver.checked) {
            if (!audioPlayed) {
                audioGameOver.volume = 0.3;
                audioGameOver.play();
                audioGameOver.loop = false;
                audioPlayed = true; // Atualiza a variável de controle
            }
        }
        themeAudio.pause();
        audioStar.pause();
        
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


    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('game-board')) {
            jump();
        }
    });


//Função para aumentar a velocidade do cano

let lastTimestamp = null;

function updateAnimationDuration(timestamp) {
    if (!lastTimestamp) {
        lastTimestamp = timestamp;
    }
    const elapsedMilliseconds = timestamp - lastTimestamp;
    const elapsedSeconds = elapsedMilliseconds / 1000;

    if (tempo % 2 === 0 && duration > 1) {
        duration -= 0.01 * elapsedSeconds;
        console.log(tempo);
        console.log(duration);
    }

    pipe.style.animationDuration = `${duration}s`;

    lastTimestamp = timestamp;

    requestAnimationFrame(updateAnimationDuration);
}

requestAnimationFrame(updateAnimationDuration);




  