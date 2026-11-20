let cafes = 0;
let cafesporsegundo = 0;

let qtdCoador = 0;
let custoCoador = 10;
let producaoCoador = 1;

const contador = document.getElementById('contador');
const cps = document.getElementById('cps');
const btnCafe = document.getElementById('btncafe');

const btnCoador = document.getElementById('btncoador');
const coador = document.getElementById('ccoador');
const totalCoador = document.getElementById('qtdcoador');

function attcafe() {
    contador.textContent = cafes;
    cps.textContent = cafesporsegundo;
    coador.textContent = custoCoador;
    totalCoador.textContent = qtdCoador;
}

function salvarjogo() {
    const estado = {
        cafes: cafes,
        qtdCoador: qtdCoador,
        custoCoador: custoCoador
    };

    localStorage.setItem('coffeeClickerSave', JSON.stringify(estado));
}

function carregarJogo() {
    const saveBruto = localStorage.getItem('coffeeClickerSave');
    if (!saveBruto) return;

    try {
        const estado = JSON.parse(saveBruto);

        if (typeof estado.cafes === 'number') {
            cafes = estado.cafes;
        }
        if (typeof estado.qtdCoador === 'number') {
            qtdCoador = estado.qtdCoador;
        }
        if (typeof estado.custoCoador === 'number') {
            custoCoador = estado.custoCoador;
        }
    } catch (error) {
        console.error('Erro ao carregar o save:', error);
    }
}

btnCafe.addEventListener('click', () => {
    cafes += 1;
    attcafe();
});

btnCoador.addEventListener('click', () => {
    if (cafes >= custoCoador) {
        cafes -= custoCoador;
        qtdCoador += 1;
        cafesporsegundo = qtdCoador * producaoCoador;
        custoCoador = Math.ceil(custoCoador * 1.15);
        attcafe();
        salvarjogo();
    }
});

carregarJogo();
cafesporsegundo = qtdCoador * producaoCoador;
attcafe();



const btnReset = document.getElementById('btnprogresso');

function resetarJogo() {
    localStorage.removeItem('coffeeClickerSave');
    cafes = 0;
    qtdCoador = 0;
    custoCoador = 10;
    cafesporsegundo = 0;
    attcafe();
}

btnReset.addEventListener('click', resetarJogo);

setInterval(() => {
    salvarjogo();
}, 5000);

setInterval(() => {
    cafes += cafesporsegundo;
    attcafe();
}, 1000);