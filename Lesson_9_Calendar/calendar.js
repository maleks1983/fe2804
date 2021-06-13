const PLANNERLIST = {
    [(new Date(2021, 05, 09)).toDateString()]: [
        { 'startTime': new Date(2021, 05, 09, 09, 00), 'endTime': new Date(2021, 05, 09, 10, 00), 'category': 'management', 'description': 'Meet Sophia in airport' },
        { 'startTime': new Date(2021, 05, 09, 11, 00), 'endTime': new Date(2021, 05, 09, 13, 30), 'category': 'finance', 'description': 'Studio workshop' },
        { 'startTime': new Date(2021, 05, 09, 15, 00), 'endTime': new Date(2021, 05, 09, 17, 00), 'category': 'desing', 'description': 'Design workshop with Johny Ive' }]
};

function calendar() {
    let date = new Date();
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.activeElement = [];
    this.plannerDay = new Date(activeDate.getFullYear(), activeDate.getMonth(), activeDate.getDate());

    function clearnode(nodeNme) {
        let myNode = document.getElementsByClassName(nodeNme)[0];
        while (myNode.firstChild) {
            myNode.removeChild(myNode.firstChild);
        }
    }

    this.changeMonth = function (element) {
        clearnode('daysNumber');
        this.activeElement.className = 'number_day';
        this.activeDate.setDate(1);
        let month = this.activeDate.getMonth()
        if (element.className === 'prev') {
            this.activeDate.setMonth(--month);

        }
        else if (element.className === 'next') {
            this.activeDate.setMonth(++month);
        }
        this.draw();
    }

    this.drawScheduleByDay = function (element) {
        this.activeElement.className = 'number_day';
        this.activeElement = element;
        this.activeElement.className += ' number_day--active'
        this.activeDate.setDate(element.textContent);
        drawSchedule();

    }

    this.drawSchedule = function () {
        const listWork = PLANNERLIST[this.activeDate.toDateString()];
        document.querySelector(".planner_day p").textContent = `${this.activeDate.getDate()} ${monthList[this.activeDate.getMonth()]} ${this.activeDate.getFullYear()}`;
        const plannerMenu = document.querySelector(".planner_menu");
        clearnode('planner_menu');
        for (let t = 9; t <= 20; t++) {
            let div = document.createElement('div');
            div.className = 'planner-menu--time'
            div.textContent = `${t > 9 ? t : '0' + t}:00`;
            plannerMenu.append(div);
            if (typeof (listWork) != 'undefined') {
                const findWork = listWork.find(function (el) {
                    return el['startTime'].getHours() === t;
                });
                if (findWork) {
                    let divPlannerElement = document.createElement('div');
                    const size = (findWork['endTime'] - findWork['startTime']) / 29268.292;
                    divPlannerElement.style.height = `${size}px`;
                    divPlannerElement.className = `planner-menu--work planner-menu--${findWork['category']}`;
                    divPlannerElement.innerHTML = `<p>${findWork['description']}</p>`;
                    div.append(divPlannerElement);
                }
            }

        }

    }


    this.draw = function () {
        const lastDayInMonth = function firstNumberDayInWeek(day) {
            this.lastDayInMonth = new Date(this.activeDate);
            this.lastDayInMonth.setDate(day);
            return this.lastDayInMonth;
        };
        const div = document.querySelector(".daysNumber");
        document.querySelector(".manth_name p").textContent = `${monthList[this.activeDate.getMonth()]} ${this.activeDate.getFullYear()}`;
        for (let line = 1, day = 1 - lastDayInMonth(0).getDay(); line < 7; line++) {
            let ul = document.createElement('ul');
            for (let d = 1; d <= 7; d++, day++) {
                let li = document.createElement('li');
                li.className = 'number_day';
                li.textContent = lastDayInMonth(day).getDate();
                let drawDays = lastDayInMonth(day);
                if (drawDays.getMonth() === this.activeDate.getMonth()) {
                    li.setAttribute('onclick', 'drawScheduleByDay(this)');
                }
                else {
                    li.className += ' notActive';
                }
                if (drawDays.toDateString() === this.activeDate.toDateString() ||
                    typeof (PLANNERLIST[(new Date(activeDate.getFullYear(), activeDate.getMonth(), day).toDateString())]) != 'undefined') {
                    li.className += ' number_day--active'
                    this.activeElement = li;
                }
                ul.append(li);

            }
            div.appendChild(ul);
        }
        this.drawSchedule();
    }

    this.newPlanner = function (element) {
        const beckground = document.querySelector(".beckground");
        const newPlannerForm = document.querySelector(".newWork");
        document.querySelector(".newPlanner-Lable--description textarea").value = "";
        document.querySelector(".newPlanner-Lable--Starttime").value = "09:00";
        document.querySelector(".newPlanner-Lable--Endtime").value = "09:00";
        beckground.style.display = 'block';
        newPlannerForm.style.display = 'block';
        newPlannerForm.className = `newWork category_color--${element.value}`;
        document.querySelector(".newPlanerForm").value = element.value;
        document.querySelector(".newPlanerForm-title").textContent = `${this.activeDate.getDate()} ${monthList[this.activeDate.getMonth()]} ${this.activeDate.getFullYear()}`;
    }

    this.addNewPlannerInList = function (element, event) {
        event.preventDefault();
        let plannerListTimeStart = new Date(
            this.activeDate.getFullYear(),
            this.activeDate.getMonth(),
            this.activeDate.getDate(),
            element['startTime'].value.split(':')[0],
            element['startTime'].value.split(':')[1],
        )
        let plannerListTimeEnd = new Date(
            this.activeDate.getFullYear(),
            this.activeDate.getMonth(),
            this.activeDate.getDate(),
            element['endTime'].value.split(':')[0],
            element['endTime'].value.split(':')[1],
        )
        console.log(PLANNERLIST[plannerDay.toDateString()]);
        if (typeof (PLANNERLIST[plannerDay.toDateString()]) != 'undefined') {
            PLANNERLIST[plannerDay.toDateString()].push({
                'startTime': plannerListTimeStart,
                'endTime': plannerListTimeEnd,
                'category': element.value,
                'description': element['description'].value,
            });
        }
        else {
            PLANNERLIST[plannerDay.toDateString()] = [{
                'startTime': plannerListTimeStart,
                'endTime': plannerListTimeEnd,
                'category': element.value,
                'description': element['description'].value,
            }];

        }
        this.drawSchedule();
    }


    this.draw();

}


document.body.onload = calendar();

window.onclick = function (event) {
    if (event.target == document.querySelector(".button--ok")) {
        document.querySelector(".beckground").style.display = 'none';
        document.querySelector(".newWork").style.display = 'none';

    }
}
