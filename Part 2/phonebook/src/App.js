import axios from 'axios'
import React, {useState, useEffect} from 'react'

const Filter = ({searchTerm, handleSearchTermChange})=>{
  return(
    <form>
      <div>
        filter shown with <input value={searchTerm} onChange={handleSearchTermChange}/>
  </  div>
  </form>
  )
}

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange})=>{
  return(
    <form onSubmit={addPerson}>
      <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
      </div>
    </form>
  )
}

const PersonLine = ({name, number})=><div>{name} {number}</div>

const Persons = ({filteredPersons})=> {
  return(
  filteredPersons().map(person=>
  <PersonLine key={person.name} name={person.name} number={person.number}/>
  ))
}


const App = ()=> {
  const[persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3001/persons').then(response=>{
      setPersons(response.data)
    })
  },[])

  const isInPersons = (person)=>{
    if(persons.find(p=>p.name===person.name)){
      return true
    } 
    return false
  }

  const addPerson = (event) => {
    event.preventDefault();
    
    const personObject = {
      name: newName,
      number: newNumber
    }

    if(isInPersons(persons,personObject)){
      window.alert(`${newName} is already added to phonebook`)
    } else {
      axios
        .post('http://localhost:3001/persons',personObject)
        .then(response=>{
          setPersons(persons.concat(personObject))
        })
    }

    setNewName('')
    setNewNumber('')
  }

  const filteredPersons=()=>{
    if(searchTerm===''){
      return persons
    } else {
      return persons.filter(person=>person.name.toUpperCase().includes(searchTerm.toUpperCase()))
    }
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )

}

export default App;