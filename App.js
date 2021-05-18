import React, {useState, useEffect} from "react";
import { MenuItem, FormControl, Select, Card, CardContent} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';


// https://disease.sh/v3/covid-19/all

function App() {
//state writing variables in React
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');


//useEffect runs a piece of code based on a given condition and
//runs once loaded the components, only once

useEffect(() => {
  const getCountriesData = async () => {
    fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        setCountries(countries);
      });
  };

  getCountriesData();
}, []);

const onCountryChange = async (event) => {
  const countryCode = event.target.value;

  setCountry(countryCode);
}

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
          <InfoBox title="Coranavirus Cases" cases={123} total={123}/>

          <InfoBox title="Recoved" cases={123} total={123}/>

          <InfoBox title="Deaths" cases={123} total={123}/>

      </div>
      
          <Map />
      </div>    

      <Card className="app_right">
            <CardContent>
              <h3>Live cases by country</h3>
              <h3>Worldwide new cases</h3>
            </CardContent>
      </Card>
    </div>
  );
}

export default App;
