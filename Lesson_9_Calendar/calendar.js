const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const date = new Date();
let monthNow = date.getMonth();
let yearNow = date.getFullYear();
let lastDayinMonth = new Date(yearNow, monthNow + 1, 0).getDate();
let activeDay = date.getDate();
let activeElement = [];

function clearnode(nodeNme) {
    let myNode = document.getElementsByClassName(nodeNme)[0];
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function changeMonthDown(element) {
    clearnode('daysNumber');
    activeElement.className = 'number_day';
    activeDay = 1;
    if (element.className === 'prev') {
        if (monthNow === 0) {
            monthNow = 12 - Math.abs(--monthNow % 12);
            --yearNow;
        }
        else {
            monthNow = --monthNow % 12;
        }
    }
    else if (element.className === 'next') {
        if (monthNow === 11) {
            monthNow = ++monthNow % 12;
            ++yearNow;
        }
        else {
            monthNow = ++monthNow % 12;
        }
    }
    lastDayinMonth = new Date(yearNow, monthNow + 1, 0).getDate();
    draw();
}

function drawScheduleByDay(element) {
    activeElement.className = 'number_day';
    activeElement = element;
    activeElement.className += ' number_day--active'
    activeDay = element.textContent;
    drawSchedule();

}
function drawSchedule() {
    document.querySelector(".planner_day p").textContent = `${activeDay} ${monthList[monthNow]} ${yearNow}`;
    const plannerMenu = document.querySelector(".planner_menu");
    clearnode('planner_menu');
    for (let t = 9; t <= 20; t++) {
        let div = document.createElement('div');
        div.className = 'planner-menu-time'
        div.textContent = `${t > 9 ? t : '0' + t}:00`;
        plannerMenu.append(div);
    }

}

function draw() {
    let drawDays = 0;
    let numberOfDay = new Date(yearNow, monthNow, 1).getDay() - 1;
    const div = document.querySelector(".daysNumber");
    let active = true;
    document.querySelector(".manth_name p").textContent = `${monthList[monthNow]} ${yearNow}`;
    for (let line = 1; line < 6; line++) {
        let ul = document.createElement('ul');
        for (let d = 1; d <= 7; d++) {
            let li = document.createElement('li');
            li.className = 'number_day';

            if (numberOfDay > 0) {
                li.textContent = new Date(yearNow, monthNow, 0).getDate() - --numberOfDay;
                li.className += ' notActive';
                ul.append(li);
            }
            else {
                drawDays = ++drawDays % lastDayinMonth;
                li.textContent = drawDays != 0 ? drawDays : lastDayinMonth;

                if (!active) {
                    li.className += ' notActive';
                }
                else if (!drawDays) {
                    active = false;
                }
                else {
                    if (drawDays === activeDay) {
                        li.className += ' number_day--active'
                        activeElement = li;
                    }
                    li.setAttribute('onclick', 'drawScheduleByDay(this)');
                }
                ul.append(li);
            }
        }
        div.appendChild(ul);
    }
    drawSchedule()


}

document.body.onload = draw();
