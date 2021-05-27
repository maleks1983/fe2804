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
    from = Number(getNumbersClass[2].children[0].value);
    to = Number(getNumbersClass[3].children[0].value);
    const result = getNumbers(from, to).join(', ');
    document.getElementsByClassName("btnStart")[0].hidden = true;
    getNumbersClass[4].hidden = false;
    getNumbersClass[4].children[0].value = result;
    getNumbersClass[4].children[0].style.width = result.length * 6 + 'px';
    document.getElementsByClassName("btnReset")[0].hidden = false;
}
function reset() {
    const getNumbersClass = document.getElementsByClassName("Work_1_4_1")[0].children;
    getNumbersClass[2].children[0].value = "";
    getNumbersClass[3].children[0].value = "";
    document.getElementsByClassName("btnStart")[0].hidden = false;
    getNumbersClass[4].hidden = true;
    document.getElementsByClassName("btnReset")[0].hidden = true;

}

function inputNumberIsSimple() {
    const el = document.getElementsByClassName("Work_1_4_2")[0].children;
    to = Number(el[2].children[0].value);
    el[4].hidden = true;
    el[3].hidden = false;
    el[3].children[0].value = isSimple(to).join(", ")
    el[5].hidden = false;

}
function numberIsSimpleReset() {
    const el = document.getElementsByClassName("Work_1_4_2")[0].children;
    el[2].children[0].value = null;
    el[4].hidden = false;
    el[3].hidden = true;
    el[5].hidden = true;
}


function getMultiplesNumbers() {
    const el = document.getElementsByClassName("Work_1_4_3")[0].children;
    const result = [];
    to = Number(el[2].children[0].value);
    let k = Number(el[3].children[0].value);
    for (let i = 1; i <= to; i++) {
        if (i % k === 0) {
            result.push(i);
        }
    }
    el[5].hidden = true;
    el[4].hidden = false;
    el[4].children[0].value = result.join(", ");
    el[6].hidden = false;
}

function multipleReset() {
    const el = document.getElementsByClassName("Work_1_4_3")[0].children;
    el[2].children[0].value = null;
    el[3].children[0].value = null;
    el[4].hidden = true;
    el[5].hidden = false;
    el[6].hidden = true;
}


function getPeople(handshakes) {
    const el = document.getElementsByClassName("Work_3")[0].children;
    handshakes = Number(el[2].children[0].value);
    let handshake = 0;
    let totalPeople = 0;
    while (handshake < handshakes) {
        totalPeople++;
        handshake += totalPeople;
    }
    el[4].hidden = true;
    el[3].hidden = false;
    el[3].children[0].value = totalPeople;
    el[5].hidden = false;
}
function handshakesReset() {
    const el = document.getElementsByClassName("Work_3")[0].children;
    el[2].children[0].value = null;
    el[3].hidden = true;
    el[4].hidden = false;
    el[5].hidden = true;
}
    



