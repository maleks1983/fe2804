GAME_Field = [];
let numberMoves = 0;
const sizeGameField = 3;



function createPlayingField(x) {
    const sectionWidth = 150;
    const sectionHeight = sectionWidth;
    const main = document.body.children[2];
    const fieling = document.createElement('div');
    fieling.className = 'playingField';
    fieling.style.display = 'grid';
    fieling.style.gridTemplateRows = `repeat(${x},1fr)`;
    fieling.style.maxWidth = `${sectionWidth * x}px`
    main.appendChild(fieling);
    for (let i = 0; i < x; i++) {
        const line = document.createElement('div');
        line.className = 'playingFieldLine';
        line.style.display = 'grid';
        line.style.gridTemplateColumns = `repeat(${x},1fr)`;
        fieling.appendChild(line);
        GAME_Field[i] = [];
        for (let j = 0; j < x; j++) {
            GAME_Field[i][j] = -1;
            const section = document.createElement('div');
            section.className = "sectionPlayingField"
            section.id = `sectionGame_${i}_${j}`;
            section.insertAdjacentHTML('afterBegin', '<button class = "btnSectionGame" type="button" onclick="actuveSectionPlayingField(this)"></button>')
            line.appendChild(section);
            section.style.width = `${sectionWidth}px`;
            section.style.height = `${sectionWidth}px`;
        }
    }


}
function winner(player) {
    let winner = false;
    const line = document.getElementsByTagName('svg')[0];
    for (let i = 0; i < GAME_Field.length; i++) {
        for (let j = 0; j < GAME_Field[i].length; j++) {
            if (GAME_Field[i][j] === player && GAME_Field[i][j] != -1) {
                winner = true;
            }
            else {
                winner = false;
                break;
            }

        }
        if (winner) {
            line.style.display = 'block';
            line.style.transform = `translate(-20px, ${i * 150}px)`;
            return winner;

        }

    }
    for (let j = 0; j < GAME_Field.length; j++) {
        for (let i = 0; i < GAME_Field[j].length; i++) {
            if (GAME_Field[i][j] === player && GAME_Field[i][j] != -1) {
                winner = true;
            }
            else {
                winner = false;
                break;
            }

        }
        if (winner) {
            line.style.display = 'block';
            line.style.transform = `translate(${-180 + j * 150}px, 155px) rotate(90deg)`;
            return winner;
        }

    }
    for (let i = 0, j = 0; i < GAME_Field.length; i++, j++) {
        if (GAME_Field[i][j] === player && GAME_Field[i][j] != -1) {
            winner = true;
        }
        else {
            winner = false;
            break;
        }
    }
    if (winner) {
        line.style.display = 'block';
        line.style.transform = 'rotate(45deg) translate(100px, 125px) scaleX(1.38)';
        return winner;
    }
    for (let i = 0, j = GAME_Field[i].length - 1; i < GAME_Field.length; i++, j--) {
        if (GAME_Field[i][j] === player && GAME_Field[i][j] != -1) {
            winner = true;
        }
        else {
            winner = false;
            break;
        }
    }
    if (winner) {
        line.style.display = 'block';
        line.style.transform = 'rotate(135deg) translate(120px, -95px) scaleX(1.38)';
        return winner;
    }
}
function clearButton() {
    const btnList = document.getElementsByClassName('btnSectionGame');
    for (let i = 0; i < btnList.length; i++) {
        btnList[i].onclick='';
    }

}

function actuveSectionPlayingField(el) {
    const playerX = 1;
    const playerO = 0;
    let position = el.parentNode.id.split('_');
    numberMoves++;
    if (numberMoves % 2 === 0) {
        el.parentNode.className += ' activeZero';
        GAME_Field[position[1]][position[2]] = playerO;
        if (winner(playerO)) {
            clearButton();
            return alert('Winner 0');
        }
    }
    else {
        el.parentNode.className += ' activeX';
        GAME_Field[position[1]][position[2]] = playerX;
        if (winner(playerX)) {
            clearButton();
            return alert('Winner X');
        }
    }
    if(numberMoves===sizeGameField*sizeGameField){
        return alert('Game Over!')

    }
    el.onclick = '';


}

document.body.onload = createPlayingField(sizeGameField);
