import React, {useState} from 'react'

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
  const[persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

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
      setPersons(persons.concat(personObject))
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