import WheaterData from "./WheaterData";


const CountryData = ({ country }) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="flag" width="200" />
      <WheaterData country={country} />
    </div>
  )
}

export default CountryData;
