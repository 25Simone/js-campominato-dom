// functions
// funzione evento cambio colore al click del box
function createEvent(element, i) {
    element.addEventListener('click', function() {
        this.classList.toggle('box-bg-color');
        // se il numero corrispondente al box cliccato è presente nella lista dei numeri random, questo diventa rosso
        if(uniqueRandomList.includes(i)){
           this.classList.add('red');
           this.classList.remove('box-bg-color');
           page.classList.add('op');
           loseMessage.classList.remove('d-none')
        }
    })
}

// funzione per creare i box collegata all'evento
function createNewBox(container, i){
    const square = document.createElement('div');
    square.className = 'box';
    container.append(square); 
    createEvent(square, i);
}

// funzione per definire il numero di massimo di celle nella griglia
function createGrid(maxCell) {
    boxContainer.innerHTML = '';
    uniqueRandomList = [];
    for (let i = 0; i < maxCell; i++) {
        createNewBox(boxContainer, i);

        // genero 16 numeri random univoci che inserisco poi nell'array uniqueRandomList
        while (uniqueRandomList.length < 16) {
            const randomNum = getNumber(1, maxCell);
            if(!uniqueRandomList.includes(randomNum)) {
                uniqueRandomList.push(randomNum);
            }
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

// definisco la variabile dei collegamento all'messaggio lose
const loseMessage = document.querySelector('.lose-message');
// definisco la varibile del bottone refresh
const refreshButton = document.getElementById('refresh-button')

// dichiaro l'array della lista numeri
let uniqueRandomList = [];

// definisco gli eventi click dei tre bottoni
button1.addEventListener('click', function() {
    createGrid(100);
    boxContainer.classList.add('level1');
    boxContainer.classList.remove('level2');
    boxContainer.classList.remove('level3');
})
button2.addEventListener('click', function() {
    createGrid(81);
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