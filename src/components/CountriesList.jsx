import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import Spinner from './Spinner';


function CountriesList() {

  const [countries, setCountries] = useState([]);
  const [fetching, setFetching] = useState(true);


  useEffect(() => {
    //setCountries(countriesData);
    const url = 'https://ih-countries-api.herokuapp.com/countries'
    
    //IIFE => API call
    const getCountries = async () => {
      const response = await axios.get(url)
      setCountries(response.data.reverse()) //get countries sorted alphabetically
      setFetching(false)
    } 

    getCountries()
    .catch(console.error)

  }, []);

  return (
    <div className="col-3" style={{ maxHeight: 90 + 'vh', overflow: 'scroll' }}>
      
      {fetching && <Spinner/>}

      <div className="list-group">
        {countries.map((country) => {
          return (
            <Link className="list-group-item list-group-item-action" to={`/${country.alpha3Code}`} key={uuid()} >
              <p>{country.name.common}</p>
              <img
                src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
                alt=""
              />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default CountriesList;
