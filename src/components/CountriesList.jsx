import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function CountriesList({countries}) {

  return (
    <div className="col-3" style={{ maxHeight: 90 + 'vh', overflow: 'scroll' }}>
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
