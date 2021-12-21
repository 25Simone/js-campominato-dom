// funzione per generare un numero random
getRandomNumber = (min, max) => Math.floor(Math.random() * ((max + 1) - min)) + min; 

// funzione che definisce la posizione delle mine nela griglia
function bombPosition (maxCell) {
    const bombsList = [];
    while (bombsList.length < 16) {
        const n = getRandomNumber(1, maxCell);
        if(!bombsList.includes(n)) {
            bombsList.push(n);
        }
    }
    return bombsList;
}

// funzione che descrive i possibili scenari a gioco terminato
function endGame(isWin, score){
    const loseMessage = document.getElementById('lose-message');
    const winMessage = document.getElementById('win-message');
    const punteggio = document.getElementById('score');
    const page = document.querySelector('.page');
    if (isWin, score) {
        page.classList.add('op');
        loseMessage.classList.remove('d-none');
        refreshButton.classList.remove('d-none');
        punteggio.classList.remove('d-none');
        punteggio.innerHTML = score;
    } else {
        page.classList.add('op');
        winMessage.classList.remove('d-none');
        refreshButton.classList.remove('d-none');
        punteggio.classList.remove('d-none');
        punteggio.innerHTML = score;
    }
}

// funzione che descrive il funzionamento del gioco
function game(maxCell, container, bombsPositionFunction) {
    // definisco un contatore per il numero di box azzurri cliccati
    let contatore = 0;
    const bombs = bombsPositionFunction(maxCell);
    // reset
    container.innerHTML = '';
    for(let i = 1; i <= maxCell; i++) {
        const box = document.createElement('div');
        box.className = 'box';
        container.append(box);

        // definisco l'evento al click di ciascun box
        box.addEventListener('click', () => {
            if(bombs.includes(i)) {
                box.classList.add('red');
                endGame(false, contatore)
            } else {
                box.classList.add('box-bg-color')
                contatore++;

                if(contatore == maxCell - 16) {
                    endGame(true, contatore);
                }
            }
        })
    }
}


// definisco la variabile di collegamento all'html
const boxContainer = document.getElementById('container');

// definisco le variabili dei tre bottoni
const button1 = document.getElementById('button-level1');
const button2 = document.getElementById('button-level2');
const button3 = document.getElementById('button-level3');

// definisco la varibile del bottone refresh
const refreshButton = document.getElementById('refresh-button');

// definisco l'evento al click del bottone refresh
refreshButton.addEventListener('click', () => window.location.reload())

// definisco gli eventi click dei tre bottoni
button1.addEventListener('click', function() {
    boxContainer.className = 'level1';
    game(100, boxContainer, bombPosition);
})
button2.addEventListener('click', function() {
    boxContainer.className = 'level2';
    game(81, boxContainer, bombPosition);
})
button3.addEventListener('click', function() {
    boxContainer.className = 'level3';
    game(49, boxContainer, bombPosition);
})
