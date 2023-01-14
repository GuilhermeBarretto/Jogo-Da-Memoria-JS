const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');


const characters = [
    'badassBeth',
    'EvilMorty',
    'Jerry',
    'mesecks',
    'pessoaPassaro',
    'PiclesRick',
    'Rick',
    'rickAndmorty',
    'Sr.BundaCagada',
    'Summer', 
];
    

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard= '' ;
let secondCard= '' ;

const checkEndGame = () => {
    const disableCards = document.querySelectorAll('.disable-card');
    
    if(disableCards.length == 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}!, Seu tempo foi: ${timer.innerHTML} segundos!`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if(firstCharacter == secondCharacter){
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();
    }
    else{

        setTimeout(() => {
           
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        
        }, 500);
        
    }
}

const revealcard = ( {target} ) => {

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }

    if (firstCard == '') {
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }
    else if (secondCard == ''){
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }
    
}

const createCard = (character) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');
  
    front.style.backgroundImage = `url('../assets/${character}.jpg')`;
  
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealcard);
    card.setAttribute('data-character', character);
  
    return card;
  }

const loadGame = () => {

    const duplicateCharacters = [ ...characters, ...characters ];

    const shufledArrey = duplicateCharacters.sort(() => Math.random() - 0.5 );
    
    shufledArrey.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });

}

const startTimer = () => {
    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    },1000);
}

window.onload = () =>{
    
    const playerName = localStorage.getItem('player');

    spanPlayer.innerHTML = playerName;
    
    startTimer();
    loadGame();
}