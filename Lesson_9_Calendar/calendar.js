const PLANNERLIST = {
    [(new Date(2021, 05, 09)).toDateString()]: [
        { 'startTime': new Date(2021, 05, 09, 09, 00), 'endTime': new Date(2021, 05, 09, 10, 00), 'category': 'management', 'description': 'Meet Sophia in airport' },
        { 'startTime': new Date(2021, 05, 09, 11, 00), 'endTime': new Date(2021, 05, 09, 13, 30), 'category': 'finance', 'description': 'Studio workshop' },
        { 'startTime': new Date(2021, 05, 09, 15, 00), 'endTime': new Date(2021, 05, 09, 17, 00), 'category': 'desing', 'description': 'Design workshop with Johny Ive' }]
};

function calendar() {
    const monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    this.activeDate = new Date();
    this.activeElement = [];
    this.plannerDay = function () {
        return new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), this.activeDate.getDate());
    };

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
        const b = this.activeElement.className.includes('planner_day--planner');
        this.activeElement.className.includes('planner_day--planner') ? this.activeElement.className = 'number_day planner_day--planner' :
            this.activeElement.className = 'number_day';
        this.activeElement = element;
        this.activeElement.className.includes('planner_day--planner') ?
            this.activeElement.className = 'number_day planner_day--planner number_day--active' :
            this.activeElement.className = 'number_day number_day--active'
        this.activeDate.setDate(element.textContent);
        this.drawSchedule();

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
        const lastDayInMonth = function (day) {
            let lastDayInMonth = new Date(this.activeDate.getFullYear(), this.activeDate.getMonth() + 1, 0);
            lastDayInMonth.setDate(day);
            return lastDayInMonth;
        };
        const div = document.querySelector(".daysNumber");
        document.querySelector(".manth_name p").textContent = `${monthList[this.activeDate.getMonth()]} ${this.activeDate.getFullYear()}`;
        for (let line = 1, day = (1 - lastDayInMonth.call(this, 0).getDay()); line < 7; line++) {
            let ul = document.createElement('ul');
            for (let d = 1; d <= 7; d++, day++) {
                let li = document.createElement('li');
                li.className = 'number_day';
                let drawDays = lastDayInMonth.call(this, day);
                li.textContent = drawDays.getDate();

                if (drawDays.getMonth() === this.activeDate.getMonth()) {
                    li.setAttribute('onclick', 'calendar.drawScheduleByDay(this)');
                }
                else {
                    li.className += ' notActive';
                }
                if (typeof (PLANNERLIST[(new Date(this.activeDate.getFullYear(), this.activeDate.getMonth(), day).toDateString())]) != 'undefined') {
                    li.className += ' planner_day--planner'
                }
                if (drawDays.toDateString() === this.activeDate.toDateString()) {
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
        const planerDay = this.plannerDay.call(this).toDateString();
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
        if (typeof (PLANNERLIST[planerDay]) != 'undefined') {
            PLANNERLIST[planerDay].push({
                'startTime': plannerListTimeStart,
                'endTime': plannerListTimeEnd,
                'category': element.value,
                'description': element['description'].value,
            });
        }
        else {
            PLANNERLIST[planerDay] = [{
                'startTime': plannerListTimeStart,
                'endTime': plannerListTimeEnd,
                'category': element.value,
                'description': element['description'].value,
            }];

        }
        this.activeElement.className = 'number_day planner_day--planner';
        this.drawSchedule();
    }
    this.closeWindows = function () {
        document.querySelector(".beckground").style.display = 'none';
        document.querySelector(".newWork").style.display = 'none';
    }

    this.draw();

}
this.calendar = new calendar();