const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameover = document.querySelector('.gameover');


const audioGameOver = new Audio();
    audioGameOver.src = './sound/gameover.mp3';
    audioGameOver.loop = false;


const jump = () => {
    mario.classList.add('jump');

 
    //   audioElement.play()



    setTimeout(() => {
        
        mario.classList.remove('jump');

    }, 500);

}


const fimDoJogo = setInterval(() => {
    
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');
   
    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 90) {

        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`

        // mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`

        mario.src = './img/gameover.png';
        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        mario.classList.add('mario-gameover');

       audioGameOver.play()

       gameover.src = './img/game_over.png';
    

      

        clearInterval();
       
    }

}, 10);


document.addEventListener('click', jump);

const restart = () => {
    
}

    