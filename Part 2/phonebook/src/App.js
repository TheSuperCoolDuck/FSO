import React, {useState, useEffect} from 'react'
import personService from './services/persons'

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

const PersonLine = ({person, handleDeletePerson})=>{
  return(
    <div>
      {person.name} {person.number}
      <button onClick = {()=>handleDeletePerson(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({filteredPersons,handleDeletePerson})=> {
  return(
  filteredPersons().map(person=>
  <PersonLine key={person.name} person={person} handleDeletePerson={handleDeletePerson}/>
  ))
}


const App = ()=> {
  const[persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    personService
      .getAll()
      .then(initialPersons=>{
      setPersons(initialPersons)
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
      personService
        .create(personObject)
        .then(returnedPerson=>{
          setPersons(persons.concat(returnedPerson))
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

  const handleDeletePerson=(id)=>{
    personService
      .deletePerson(id)
      .then(
        setPersons(persons.filter(p=>p.id!==id))
      )
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTerm={searchTerm} handleSearchTermChange={handleSearchTermChange}/>
      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDeletePerson={handleDeletePerson}/>
    </div>
  )

}

export default App;