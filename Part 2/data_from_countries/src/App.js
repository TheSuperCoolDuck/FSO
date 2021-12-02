import React, {useState, useEffect} from 'react'
import axios from 'axios'

const CountryView=({countryData})=>{
  if(countryData===null){
    return <></>
  } else {
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
  }
}

const CountryDisplay = ({filteredCountriesData, handleShowClick}) =>{

 if(filteredCountriesData.length>=10||filteredCountriesData.length===0){
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  } else if(filteredCountriesData.length===1){
    return <></>
  } else {
    return(
      filteredCountriesData.map(countryData =>
      <div key={countryData['name']['common']}>
        {countryData['name']['common']} <button onClick={()=>handleShowClick(countryData)}>show</button>
      </div>)
    )
  }
}

const App=()=> {
  const [countriesData, setCountriesData] = useState([])
  const [search, setSearch] = useState('')
  const [filteredCountriesData, setFilteredCountriesData] = useState([])
  const [countryData, setCountryData] = useState(null)

  useEffect(()=>{
    axios.get('https://restcountries.com/v3.1/all').then(response=>{
      setCountriesData(response.data)
    })
  },[])

  const handleSearchChange=(event)=>{
    let currentSearch = event.target.value
    setSearch(currentSearch)
    setCountryData(null)
    if(currentSearch!==''){
      const currentFilteredCountriesData = countriesData.filter(country=>country['name']['common'].toUpperCase().includes(currentSearch.toUpperCase()))
      setFilteredCountriesData(currentFilteredCountriesData)
      if(currentFilteredCountriesData.length===1){
        setCountryData(currentFilteredCountriesData[0])
      }
    }
  }

  const handleShowClick=(data)=>{
    setCountryData(data)
  }

  return (
    <div>
      <form>
        <div>
          find countries
          <input value={search} onChange={handleSearchChange}/>
        </div>
      </form>
      <CountryDisplay filteredCountriesData={filteredCountriesData} handleShowClick={handleShowClick}/>
      <CountryView countryData={countryData}/>
    </div>
  )
}

export default App;
