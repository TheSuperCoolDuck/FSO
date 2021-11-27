import React, {useState} from 'react'

const Button = ({handleClick,text})=>(
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) =>{
  const {text, value, isPercentage} = props

  if(isPercentage)
  {
    return(
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  } else{
    return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
}

const Statistics = (props) =>{
  const {good, neutral, bad} = props

  const getAll = () => good + neutral + bad
  const getAverage = () => (good-bad)/getAll()
  const getPositive = () => (good/getAll())*100

  if(getAll()<=0){
    return(
      <div>
        No feedback given
      </div>
    )
  } else{
    return(
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} isPercentage={false}/>
          <StatisticLine text={"neutral"} value={neutral} isPercentage={false}/>
          <StatisticLine text={"bad"} value={bad} isPercentage={false}/>
          <StatisticLine text={"all"} value={getAll()} isPercentage={false}/>
          <StatisticLine text={"average"} value={getAverage()} isPercentage={false}/>
          <StatisticLine text={"positive"} value={getPositive()} isPercentage={true}/>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handlerGoodClick=()=>{
    setGood(good+1)
  }

  const handlerNeutralClick=()=>{
    setNeutral(neutral+1)
  }

  const handlerBadClick=()=>{
    setBad(bad+1)
  }

  return(
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handlerGoodClick} text='good'/>
      <Button handleClick={handlerNeutralClick} text='neutral'/>
      <Button handleClick={handlerBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App;
