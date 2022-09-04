import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import countriesData from '../countries.json';


function CountryDetails() {
  const [foundCountry, setFoundCountry] = useState(null);

  const { countryId } = useParams();

  useEffect(() => {
    const url = `https://ih-countries-api.herokuapp.com/countries/${countryId}`

    const getCountry = async () => {
      const response = await axios.get(url)
      setFoundCountry(response.data);
    }

    getCountry()
    .catch(console.error)

  }, [countryId]);

  return (
    <div className="col-9">
      {!foundCountry && <h3>Country not found !</h3>}
      {foundCountry && (
        <>
          <img
            src={`https://flagpedia.net/data/flags/icon/72x54/${foundCountry.alpha2Code.toLowerCase()}.png`}
            alt={`${foundCountry.name.common}'s flag`}
            style={{ margin: '3rem', width: 200 }}
          />

          <h1>{foundCountry.name.common}</h1>
          <br />
          <h4>Capital</h4>
          <p>{foundCountry.capital}</p>
          <br />
          <h4>Area</h4>
          <p>
            {foundCountry.area} km<sup>2</sup>
          </p>
          <br />
          {foundCountry.borders.length !== 0 && (
            <>
              <h4>Borders</h4>
              {foundCountry.borders.map((alpha3CodeBorder) => {
                const country = countriesData.filter((country) => country.alpha3Code === alpha3CodeBorder)[0];
                return (
                  <ul style={{ listStyle: 'none' }}>
                    <li key={uuid()}>
                      <Link className="border-link" to={`/${alpha3CodeBorder}`}>
                        {country.name.common}
                      </Link>
                    </li>
                  </ul>
                );
              })}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default CountryDetails;
