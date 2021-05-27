import React, {useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import './LineGraph.css';

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
            <Line className={"lineGraph"}
            data={{
                datasets: [{
                    backgroundColor: "#FD6362",
                    color: "red",
                    borderColor: "#FD6362",
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
