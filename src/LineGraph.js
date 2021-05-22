import React, {useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';

// function LineGraph() {
//     const [data, setData] = useState({});

//     const buildChartData = (data, casesType = "cases") => {
//         const chartData = [];
//         let lastDataPoint;
//         for (let date in data.cases) {
//           if (lastDataPoint) {
//             let newDataPoint = {
//               x: date,
//               y: data[casesType][date] - lastDataPoint,
//             };
//             chartData.push(newDataPoint);
//           };
//           lastDataPoint = data[casesType][date];
//         };
//         return chartData;
//       };

// useEffect(() => {
//     const fetchData = async () => {

//     await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
//     .then((response) => response.json())
//     .then((data) =>{
//         let chartData = buildChartData(data, "cases");
//         setData(chartData);
//     });
//     };
//     fetchData();
// },[]);

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
      if (lastDataPoint) {
        let newDataPoint = {
          x: date,
          y: data[casesType][date] - lastDataPoint,
        };
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[casesType][date];
    }
    return chartData;
  };
  
  function LineGraph({ casesType = "cases" }) {
    const [data, setData] = useState({});
  
    useEffect(() => {
      const fetchData = async () => {
        await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let chartData = buildChartData(data, casesType);
            setData(chartData);
          });
      };
  
      fetchData();
    }, [casesType]);

return (
        <div>
             {data?.length > 0 && (
            <Line 
            data={{
                datasets: [{
                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                    borderColor: "#CC1034",
                    data:data,
                    label:"daily cases",
                },],
            }} 
            /> 
            )}
        </div>
    )
}

export default LineGraph

