import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryDisplay = ({filteredCountriesData}) =>{
  if(filteredCountriesData.length>=10||filteredCountriesData.length===0){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if(filteredCountriesData.length===1){
    const countryData = filteredCountriesData[0] 
    return(
      <div>
        <h1>{countryData['name']['common']}</h1>
        <div>capital {countryData['capital']}</div>
        <div>population {countryData['population']}</div>
        <h2>languages</h2>
        <ul>
          {Object.values(countryData['languages']).map(lang=><li key={lang}>{lang}</li>)}
        </ul>
        <img src={countryData['flags']['png']} alt="flag"/>
      </div>
    )
  } else {
    return(
      filteredCountriesData.map(countryData =><div key={countryData['name']['common']}>{countryData['name']['common']}</div>)
    )
  }
}

const App=()=> {
  const [countriesData, setCountriesData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountriesData, setFilteredCountriesData] = useState([])

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(response=>{
      setCountriesData(response.data)
    })
  },[])

  const handleSearchChange=(event)=>{
    let currentSearch = event.target.value
    setSearch(currentSearch)
    if(currentSearch!==''){
      setFilteredCountriesData(countriesData.filter(country=>country['name']['common'].toUpperCase().includes(currentSearch.toUpperCase())))
    }
  }

  return (
    <div>
      <form>
        <div>
          find countries
          <input value={search} onChange={handleSearchChange}/>
        </div>
      </form>
      <CountryDisplay filteredCountriesData={filteredCountriesData}/>
    </div>
  )
}

export default App;
