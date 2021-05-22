import React, {useState, useEffect} from "react";
import { MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import './App.css';
import Table from './Table';
import './Table.css'
import {sortData, prettyPrintStat} from './util'
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

// https://disease.sh/v3/covid-19/all

function App() {
//state writing variables in React
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [casesType, setCasesType] = useState("cases");

//useEffect runs a piece of code based on a given condition and
//runs once loaded the components, only once

useEffect(() =>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response=>response.json())
  .then(data=>{
    setCountryInfo(data);
  });
}, []);

useEffect(() => {
  const getCountriesData = async () => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      });
  };

  getCountriesData();
}, []);

const onCountryChange = async (event) => {
  const countryCode = event.target.value;
  setCountry(countryCode);

  const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

  await fetch(url)
  .then(response => response.json())
  .then(data =>{
    setCountry(countryCode);
    setCountryInfo(data);
  })
};


  return (
    <div className="app">

      <div className="app_left">
        {/*header + dropdown menu */}
      <div className="app_header">
      <h1>Covid-19 Tracker</h1>
      <FormControl className="app_dropdown">
        <Select variant="outlined" onChange={onCountryChange} value={country}>
           <MenuItem value="worldwide">Worldwide</MenuItem>
          {/* mapping all the countries */}
          {countries.map(country=>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>
      
      <div className="app_stats">

          {/* today cases need to find a new api or return null */}
          <InfoBox
          title="Coranavirus Cases"
          cases={prettyPrintStat(countryInfo.todayCases)}
          total={prettyPrintStat(countryInfo.cases)}/>

          <InfoBox
          title="Recoved"
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          total={prettyPrintStat(countryInfo.recovered)}/>

          <InfoBox
            title="Deaths"
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
            />

      </div>

      <h3>Worldwide new cases</h3>
              <LineGraph casesType={casesType} />
      </div>    

      <Card className="app_right">
            <CardContent>
              <h3>Total cases by country</h3>
              <Table countries={tableData}/>
              
            </CardContent>
      </Card>
    </div>
  );
}

export default App;
