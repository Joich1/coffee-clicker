let cafes = 0;
let cafesporsegundo = 0;

let poderclique = 1;
let custoUpgradeClique = 25;

const btnUpgradeClique = document.getElementById('btnupgradeclique');
const custoUpgradeClique2 = document.getElementById('cupgradeclique');
const poderclique2 = document.getElementById('poderclique');


const contador = document.getElementById('contador');
const cps = document.getElementById('cps');
const btnCafe = document.getElementById('btncafe');
const btnCafe2 = document.getElementById('btncafe2');
const btnReset = document.getElementById('btnprogresso');

const itensLoja = [
    {
        id: 'coador',
        cBase: 10,
        custo: 10,
        producao: 1,
        quantidade: 0,
        btn: document.getElementById('btncoador'),
        custo2: document.getElementById('ccoador'),
        qtd2: document.getElementById('qtdcoador')
    },
    {
        id: 'barista',
        cBase: 50,
        custo: 50,
        producao: 5,
        quantidade: 0,
        btn: document.getElementById('btnbarista'),
        custo2: document.getElementById('cbarista'),
        qtd2: document.getElementById('qtdbarista')
    },
    {
        id: 'expresso',
        cBase: 200,
        custo: 200,
        producao: 20,
        quantidade: 0,
        btn: document.getElementById('btnexpresso'),
        custo2: document.getElementById('cexpresso'),
        qtd2: document.getElementById('qtdexpresso') 
    }
];

function caulcularcps() {
    cafesporsegundo = itensLoja.reduce((total, item) => {
        return total + item.quantidade * item.producao;
    }, 0);
}

function attcafe() {
    contador.textContent = cafes;
    cps.textContent = cafesporsegundo;
    document.title = `${cafes} Cafés - Coffee clicker`;

    custoUpgradeClique2.textContent = custoUpgradeClique;
    poderclique2.textContent = poderclique;

    itensLoja.forEach((item) => {
        item.custo2.textContent = item.custo;
        item.qtd2.textContent = item.quantidade;
    });
}
function comprarItem(item) {
    if (cafes >= item.custo) {
        cafes -= item.custo;
        item.quantidade += 1;
        item.custo = Math.ceil(item.custo * 1.15);
        caulcularcps();
        attcafe();
        salvarjogo();
    }
}

function comprarUpgradeClique(){
    if(cafes >= custoUpgradeClique){
        cafes -= custoUpgradeClique;
        poderclique += 1
        custoUpgradeClique = Math.ceil(custoUpgradeClique * 1.15);
        attcafe();
        salvarjogo();
    }
}

btnUpgradeClique.addEventListener('click', comprarUpgradeClique);


itensLoja.forEach((item) => {
    item.btn.addEventListener('click', () => comprarItem(item));
});

btnCafe.addEventListener('click', () => {
    cafes += poderclique;
    attcafe();
});
/* teste isso, vcai tirar depois*/
btnCafe2.addEventListener('click', () =>{
    cafes += 505050500p;
    attcafe();
})



function salvarjogo() {
    const estado = {
        cafes: cafes,
        poderclique: poderclique,
        custoUpgradeClique: custoUpgradeClique,
        itens: itensLoja.map((item) => ({
            id: item.id,
            quantidade: item.quantidade,
            custo: item.custo
        }))
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

        if (Array.isArray(estado.itens)) {
            estado.itens.forEach((itemSalvo) => {
                const itemAtual = itensLoja.find((i) => i.id === itemSalvo.id);
                if (itemAtual) {
                    if (typeof itemSalvo.quantidade === 'number') {
                        itemAtual.quantidade = itemSalvo.quantidade;
                    }
                    if (typeof itemSalvo.custo === 'number') {
                        itemAtual.custo = itemSalvo.custo;
                    }
                    if (typeof estado.poderclique === 'number') {
                        poderclique = estado.poderclique;
                    }
                    if (typeof estado.custoUpgradeClique === 'number') {
                        custoUpgradeClique = estado.custoUpgradeClique;
                    }
                }
            });
        }
    } catch (error) {
        console.error('Erro ao carregar o save:', error);
    }
}

/* teste isso, vcai tirar depois*/
function resetarJogo() {
    localStorage.removeItem('coffeeClickerSave');
    cafes = 0;
    cafesporsegundo = 0;
    poderclique = 1;
    custoUpgradeClique = 25;

    itensLoja.forEach((item) => {
        item.quantidade = 0;
        item.custo = item.cBase;
    });

    attcafe();
}


btnReset.addEventListener('click', resetarJogo);

carregarJogo();
caulcularcps();
attcafe();

setInterval(() => {
    salvarjogo();
}, 5000);

setInterval(() => {
    cafes += cafesporsegundo;
    attcafe();
}, 1000);