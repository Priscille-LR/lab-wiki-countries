import './App.css';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import Spinner from './components/Spinner';
import countriesData from './countries.json';
import axios from 'axios';

function App() {

  const [countries, setCountries] = useState([]);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    //setCountries(countriesData);
    const url = 'https://ih-countries-api.herokuapp.com/countries'
    
    //IIFE => API call
    const getCountries = async () => {
      const response = await axios.get(url)
      setCountries(response.data)
      setFetching(false)
    } 

    getCountries()
    .catch(console.error)

  }, []);

  return (
    <div className="App">
      <Navbar/>
      {fetching && <Spinner/>}
      <div className="container">
        <div className="row">
          <Routes>
            <Route path='/' element={<CountriesList countries={countries}/>}/>
            <Route path='/:countryId' element={[<CountriesList countries={countries} />, <CountryDetails countries={countries}/>]}/>      
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
