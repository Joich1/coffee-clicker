let cafes = 0;
let cps = 1;

const contador = document.getElementById('contador');
const btnCafe = document.getElementById('btncafe');

function attcafe(){
    contador.textContent = cafes;
}

btnCafe.addEventListener('click', () =>{
    cafes += 1;
    attcafe();
})

setInterval(() => {
    cafes += cps;
    attcafe();
}, 1);