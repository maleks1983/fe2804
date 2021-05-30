function AverageNumberChildrenInFamily() {
    const data = ANCESTRY_DATA
        .reduce(function (data, children) {
            let k = children.father + children.mother;
            if (k) {
                k = k.replace(/\s/g, '');
                data[k] ? data[k]++ : data[k] = 1;
                return data;

            }
            return data;

        }, {});
    return Object.values(data).reduce(function (summ, num) {
        return summ + num;
    }, 0) / Object.values(data).length;

}

console.log(AverageNumberChildrenInFamily());

function getAverageAgeByCentury() {
    const centuries = ANCESTRY_DATA
        .reduce(
            function (centuries, human) {
                const humanCentury = getHumanCentury(human);

                if (humanCentury !== null) {
                    if (!centuries[humanCentury]) {
                        centuries[humanCentury] = [];
                    }

                    const humanAge = getAge(human);

                    if (!isNaN(humanAge)) {
                        centuries[humanCentury].push(humanAge);
                    }
                }

                return centuries;
            },
            {}
        );

    for (const century in centuries) {
        centuries[century] = getAverage(centuries[century]);
    }

    return centuries;
}