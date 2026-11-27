let cafes = 0;
let cafesporsegundo = 0;
let segundosOffline = 0;

let poderclique = 1;
let custoUpgradeClique = 1000;

const btnUpgradeClique = document.getElementById('btnupgradeclique');
const custoUpgradeClique2 = document.getElementById('cupgradeclique');

const poderclique2 = document.getElementById('poderclique');
const removercps = document.getElementById('removercps');

const contador = document.getElementById('contador');
const cps = document.getElementById('cps');
const btnCafe = document.getElementById('btncafe');

/* VAI SAIR DEPOIS ISSO AQUI HEIIIIINIININININIINININININI*/
const btnCafe2 = document.getElementById('btncafe2');
const btnReset = document.getElementById('btnprogresso');

const itensLoja = [
    {
        id: 'coador',
        cBase: 15,
        custo: 15,
        producao: 1,
        quantidade: 0,
        btn: document.getElementById('btncoador'),
        custo2: document.getElementById('ccoador'),
        qtd2: document.getElementById('qtdcoador')
    },
    {
        id: 'barista',
        cBase: 250,
        custo: 250,
        producao: 5,
        quantidade: 0,
        btn: document.getElementById('btnbarista'),
        custo2: document.getElementById('cbarista'),
        qtd2: document.getElementById('qtdbarista')
    },
    {
        id: 'expresso',
        cBase: 2500,
        custo: 2500,
        producao: 20,
        quantidade: 0,
        btn: document.getElementById('btnexpresso'),
        custo2: document.getElementById('cexpresso'),
        qtd2: document.getElementById('qtdexpresso')
    },
    {
        id: 'maquina de expresso',
        cBase: 10000,
        custo: 10000,
        producao: 50,
        quantidade: 0,
        btn: document.getElementById('btnmaquinaexpresso'),
        custo2: document.getElementById('cmaquinaexpresso'),
        qtd2: document.getElementById('qtdmaquinaexpresso')
    },
    {
        id: 'carrinho de café na rua',
        cBase: 150000,
        custo: 150000,
        producao: 260,
        quantidade: 0,
        btn: document.getElementById('btncarrinhocafe'),
        custo2: document.getElementById('ccarrinhocafe'),
        qtd2: document.getElementById('qtdcarrinhocafe')
    },
    {
        id: 'banco',
        cBase: 1500000,
        custo: 1500000,
        producao: 1500, // 1,5mil
        quantidade: 0,
        btn: document.getElementById('btnbanco'),
        custo2: document.getElementById('cbanco'),
        qtd2: document.getElementById('qtdbanco')
    },
    {
        id: 'cafeteria',
        cBase: 23000000,
        custo: 23000000,
        producao: 7500, // 7,5mil
        quantidade: 0,
        btn: document.getElementById('btncafeteria'),
        custo2: document.getElementById('ccafeteria'),
        qtd2: document.getElementById('qtdcafeteria')
    },
    {
        id: 'fazenda',
        cBase: 100000000,
        custo: 100000000,
        producao: 44000, // 44mil
        quantidade: 0,
        btn: document.getElementById('btnfazenda'),
        custo2: document.getElementById('cfazenda'),
        qtd2: document.getElementById('qtdfazenda')
    }
];

function caulcularcps() {
    cafesporsegundo = itensLoja.reduce((total, item) => {
        return total + item.quantidade * item.producao;
    }, 0);
}

function formatarNumero(num) {
    if (num < 1000) return Math.floor(num).toString();
    if (num < 1_000_000) return (num / 1000).toFixed(1).replace('.', ',') + 'K';
    if (num < 1_000_000_000) return (num / 1_000_000).toFixed(1).replace('.', ',') + 'M';
    if (num < 1_000_000_000_000) return (num / 1_000_000_000).toFixed(1).replace('.', ',') + 'B';
    if (num < 1_000_000_000_000_000) return (num / 1_000_000_000_000).toFixed(1).replace('.', ',') + 'T';
    if (num < 1_000_000_000_000_000_000) return (num / 1_000_000_000_000_000).toFixed(1).replace('.', ',') + 'Qa';
    if (num < 1_000_000_000_000_000_000_000) return (num / 1_000_000_000_000_000_000).toFixed(1).replace('.', ',') + 'QI';
    if (num < 1_000_000_000_000_000_000_000_000) return (num / 1_000_000_000_000_000_000_000).toFixed(1).replace('.', ',') + 'Sx';
    return (num / 1_000_000_000_000_000_000_000_000).toFixed(1).replace('.', ',') + 'Sp';
}

function attcafe() {
    contador.textContent = formatarNumero(cafes);
    cps.textContent = formatarNumero(cafesporsegundo);
    poderclique2.textContent = formatarNumero(poderclique);
    document.title = `${formatarNumero(cafes)} Cafés - Coffee clicker`;

    custoUpgradeClique2.textContent = formatarNumero(custoUpgradeClique);
    btnUpgradeClique.hidden = !(cafes >= custoUpgradeClique);

    itensLoja.forEach((item) => {
        item.custo2.textContent = formatarNumero(item.custo);
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

function comprarUpgradeClique() {
    if (cafes >= custoUpgradeClique) {
        cafes -= custoUpgradeClique;
        poderclique = Math.ceil(poderclique * 1.50);
        custoUpgradeClique = Math.ceil(custoUpgradeClique * 1.50);
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
btnCafe2.addEventListener('click', () => {
    cafes += Math.ceil(1000000000000 * poderclique);
    attcafe();
});

removercps.addEventListener('click', () => {
    cafes = 0;
    attcafe();
});

function salvarjogo() {
    const estado = {
        cafes: cafes,
        poderclique: poderclique,
        custoUpgradeClique: custoUpgradeClique,
        ultimoSave: Date.now(),
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

        if (typeof estado.poderclique === 'number') {
            poderclique = estado.poderclique;
        }

        if (typeof estado.custoUpgradeClique === 'number') {
            custoUpgradeClique = estado.custoUpgradeClique;
        }

        if (typeof estado.ultimoSave === 'number') {
            const diferencaMS = Date.now() - estado.ultimoSave;
            if (diferencaMS > 0) {
                segundosOffline = Math.floor(diferencaMS / 1000);
            }
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
    segundosOffline = 0;
    poderclique = 1;
    custoUpgradeClique = 1000;

    itensLoja.forEach((item) => {
        item.quantidade = 0;
        item.custo = item.cBase;
    });

    attcafe();
}

btnReset.addEventListener('click', resetarJogo);

carregarJogo();
caulcularcps();

if (segundosOffline > 0 && cafesporsegundo > 0) {
    const ganhoOffline = segundosOffline * cafesporsegundo;
    cafes += ganhoOffline;
}

attcafe();

setInterval(() => {
    salvarjogo();
}, 5000);

setInterval(() => {
    cafes += cafesporsegundo;
    attcafe();
}, 1000);