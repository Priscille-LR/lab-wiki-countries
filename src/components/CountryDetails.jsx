import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function CountryDetails({ countries }) {
  const { countryId } = useParams();

  if (countries.length === 0) return;

  const country = countries.filter((countryEl) => countryEl.alpha3Code === countryId)[0];

  return (
    <div className="col-9">
      <img
        src={`https://flagpedia.net/data/flags/icon/72x54/${country.alpha2Code.toLowerCase()}.png`}
        alt={`${country.name.common}'s flag`} 
        style={{margin: "3rem", width:200}}
      />

      <h1>{country.name.common}</h1>
      <br />
      <h4>Capital</h4>
      <p>{country.capital}</p>
      <br />
      <h4>Area</h4>
      <p>
        {country.area} km<sup>2</sup>
      </p>
      <br />
      {country.borders.length !== 0 && (
        <>
          <h4>Borders</h4>
          {country.borders.map((alpha3CodeBorder) => {
            const country = countries.filter((country) => country.alpha3Code === alpha3CodeBorder)[0];
            return (
              <ul style={{ listStyle: 'none' }}>
                <li key={uuid()}>
                  <Link className="border-link" to={`/${alpha3CodeBorder}`}>
                    {country.name.common}
                  </Link>
                </li>
              </ul>
            )
          })}
        </>
      )}
    </div>
  );
}

export default CountryDetails;
