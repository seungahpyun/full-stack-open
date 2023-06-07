import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import CountryData from "./components/CountryData";

const App = () => {
  const [query, setQuery] = useState("")
  const [countries, setCountries] = useState([]);
  const [countriesToShow, setCountriesToShow] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    })
  }, [])

  const handleQueryChange = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);
    setCountriesToShow(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
  }

  return(
    <div>
      <p>find countries <input value={query} onChange={handleQueryChange} /></p>
      {countriesToShow.length === 1
        && (<CountryData country={countriesToShow[0]} />)}
      {countriesToShow.length > 10
        ? (<p>Too many matches, specify another filter</p>)
        : (<Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow}/>)}
    </div>
  )
}
export default App;
