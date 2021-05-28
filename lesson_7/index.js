let from = 0;
let to = 0;
function getNumbers(from, to) {

    let result = [];
    for (let i = from; i < to; i++) {
        result.push(i);
    }
    return result;

}
function isSimple(to) {
    const result = [];
    let Simple = true;
    for (let i = 2; i < to; i++) {
        Simple = true;
        for (let j = 2; j < i; j++) {
            if (i % j === 0) {
                Simple = false;
                break;
            }
        }
        if (Simple) {
            result.push(i);
        }
    }
    return result;
}

//HW1.4

function inputNumberGetNumbers() {
    const getNumbersClass = document.getElementsByClassName("Work_1_4_1")[0].children;
    const inpetLable  =getNumbersClass[2].children;
    from = Number(inpetLable[0].children[0].value);
    to = Number(inpetLable[1].children[0].value);
    const result = getNumbers(from, to).join(', ');
    inpetLable[4].hidden = true;
    inpetLable[2].hidden = false;
    inpetLable[2].children[0].value = result;
    inpetLable[3].hidden = false;
}
function getNumbersreset() {
    const getNumbersClass = document.getElementsByClassName("Work_1_4_1")[0].children;
    const inpetLable  = getNumbersClass[2].children;
    inpetLable[4].hidden = false;
    inpetLable[2].hidden = true;
    inpetLable[3].hidden = true;
}

function inputNumberIsSimple() {
    const el = document.getElementsByClassName("Work_1_4_2")[0].children;
    const inpetLable  = el[2].children;
    to = Number(inpetLable[0].children[0].value);
    inpetLable[3].hidden = true;
    inpetLable[1].hidden = false;
    inpetLable[1].children[0].value = isSimple(to).join(", ")
    inpetLable[2].hidden = false;

}

function isSimpleReset() {
    const el = document.getElementsByClassName("Work_1_4_2")[0].children;
    const inpetLable  = el[2].children;
    inpetLable[3].hidden = false;
    inpetLable[1].hidden = true;
    inpetLable[2].hidden = true;
}


function getMultiplesNumbers() {
    const el = document.getElementsByClassName("Work_1_4_3")[0].children;
    const inpetLable  = el[2].children;
    const result = [];
    to = Number(inpetLable[0].children[0].value);
    let k = Number(inpetLable[1].children[0].value);
    for (let i = 1; i <= to; i++) {
        if (i % k === 0) {
            result.push(i);
        }
    }
    inpetLable[4].hidden = true;
    inpetLable[2].hidden = false;
    inpetLable[2].children[0].value = result.join(", ");
    inpetLable[3].hidden = false;
}

function multipleReset() {
    const el = document.getElementsByClassName("Work_1_4_3")[0].children;
    const inputLable  = el[2].children;
    inputLable[2].hidden = true;
    inputLable[4].hidden = false;
    inputLable[3].hidden = true;
}


function getPeople(handshakes) {
    const el = document.getElementsByClassName("Work_3")[0].children;
    const inputLable  = el[2].children;
    handshakes = Number(inputLable[0].children[0].value);
    let handshake = 0;
    let totalPeople = 0;
    while (handshake < handshakes) {
        totalPeople++;
        handshake += totalPeople;
    }
    inputLable[3].hidden = true;
    inputLable[1].hidden = false;
    inputLable[1].children[0].value = totalPeople;
    inputLable[2].hidden = false;
}
function handshakesReset() {
    const el = document.getElementsByClassName("Work_3")[0].children;
    const inputLable  = el[2].children;
    inputLable[1].hidden = true;
    inputLable[3].hidden = false;
    inputLable[2].hidden = true;
}
    



