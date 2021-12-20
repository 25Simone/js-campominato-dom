// functions
// funzione evento cambio colore al click del box
let contatore=0;
function createEvent(element, i, maxCell) {
    element.addEventListener('click', function() {
        if(uniqueRandomList.includes(i)){
            this.classList.add('red');
            page.classList.add('op');
            loseMessage.classList.remove('d-none')
        } else {
            this.classList.add('box-bg-color');
            contatore++;
            win(maxCell);
        }
    })
}
// definisco gli eventi legati alla vittoria della partita
function win (maxCell) {
    if(contatore === maxCell - 16) {
        page.classList.add('op');
        winMessage.classList.remove('d-none')
    }
}

// funzione per creare i box collegata all'evento
function createNewBox(container, i, maxCell){
    const square = document.createElement('div');
    square.className = 'box';
    container.append(square); 
    createEvent(square, i, maxCell);
}

// funzione per definire il numero di massimo di celle nella griglia
function createGrid(maxCell) {
    boxContainer.innerHTML = '';
    uniqueRandomList = [];
    for (let i = 0; i < maxCell; i++) {
        createNewBox(boxContainer, i, maxCell);
    }
}

// funzione che definisce la posizione delle mine nela griglia
function bombPosition (maxCell) {
    // genero 16 numeri random univoci che inserisco poi nell'array uniqueRandomList
    while (uniqueRandomList.length < 16) {
        const randomNum = getNumber(1, maxCell);
        if(!uniqueRandomList.includes(randomNum)) {
            uniqueRandomList.push(randomNum);
        }
    }
}

// funzione per generare un numero random
function getNumber (min, max) {
    const result = Math.floor(Math.random() * ((max + 1) - min)) + min;
    return result;
}



// definisco la variabile di collegamento all'html
const boxContainer = document.querySelector('.container');
const page = document.querySelector('.page');

// definisco le variabili dei tre bottoni
const button1 = document.getElementById('button-level1');
const button2 = document.getElementById('button-level2');
const button3 = document.getElementById('button-level3');

// definisco la variabile dei collegamento all'messaggio lose and win
const loseMessage = document.querySelector('.lose-message');
const winMessage = document.querySelector('.win-message');

// definisco la varibile del bottone refresh
const refreshButton = document.querySelector('.refresh-button');

// dichiaro l'array della lista numeri
let uniqueRandomList = [];

// definisco gli eventi click dei tre bottoni
button1.addEventListener('click', function() {
    contatore = 0;
    createGrid(100);
    bombPosition(100);
    boxContainer.classList.add('level1');
    boxContainer.classList.remove('level2');
    boxContainer.classList.remove('level3');
})
button2.addEventListener('click', function() {
    createGrid(81);
    bombPosition(81);
    boxContainer.classList.add('level2');
    boxContainer.classList.remove('level1');
    boxContainer.classList.remove('level3');
})
button3.addEventListener('click', function() {
    createGrid(49);
    boxContainer.classList.add('level3');
    boxContainer.classList.remove('level1');
    boxContainer.classList.remove('level2');
})

// definisco l'evento al click del bottone refresh
refreshButton.addEventListener('click', 
() => window.location.reload())