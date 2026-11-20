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

function attcafe(){
    contador.textContent = cafes;
    cps.textContent = cafesporsegundo;
    coador.textContent = custoCoador;
    totalCoador.textContent = qtdCoador;
}

btnCafe.addEventListener('click', () =>{
    cafes += 1;
    attcafe();
})

btnCoador.addEventListener('click', () =>{
    if (cafes >= custoCoador){
        cafes -= custoCoador;
        qtdCoador += 1;
        cafesporsegundo = qtdCoador * producaoCoador;
        custoCoador = Math.ceil(custoCoador * 1.15);
        attcafe();
    }
})

setInterval(() => {
    cafes += cafesporsegundo;
    attcafe();
}, 1);