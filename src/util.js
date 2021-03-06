import numeral from 'numeral';

export const sortData = (data) => {
    const sortedData = [...data];

    //ternary es6
    return sortedData.sort((a,b) => (a.cases > b.cases ? -1 : 1));
};

export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format("0.0a")}` : "+0";