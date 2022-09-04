import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';


function App() {

  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <div className="row">
          <Routes>
            <Route path='/' element={<CountriesList/>}/>
            <Route path='/:countryId' element={[<CountriesList/>, <CountryDetails/>]}/>      
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
