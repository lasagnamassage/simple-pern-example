import axios from 'axios'

import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [secretWordInput, setSecretWordInput] = useState('')
  const [secretWord, setSecretWord] = useState(null)
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  
  function handleChange(event)  {
    setSecretWordInput(event.target.value)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    let result = await axios.post('http://localhost:3000/check', {secretWordInput})
    console.log(result);
    // case one: new entry from clear
    if (typeof result.data === 'string')
      setSecretWord(result.data)
    if (result.data === false)
      setErrorMessage('Wrong word!')
      setSuccessMessage('')
    if (result.data === true) {
      setErrorMessage('')
      setSuccessMessage('Correct!')
    }
  }

  async function handleReset() {
    let result = await axios.delete('http://localhost:3000/reset')
    setErrorMessage('')
    setSuccessMessage('')
    setSecretWord('')
  }

  

  return (
    <>
      {
        secretWord ? <h1>Special word set to: {secretWord}</h1> : <h1>No special word set!</h1>
      }
      {
        errorMessage?.length > 0 ?  <h2 style={{color: 'red'}}>{ errorMessage }</h2> : null
      }
      {
        successMessage?.length > 0 ?  <h2 style={{color: 'green'}}>{ successMessage }</h2> : null
      }
      <form onSubmit={(event) => handleSubmit(event)}>
        <label htmlFor="secretWordInput">Enter special word:</label>
        <input type="text" id="secretWordInput" onChange={handleChange} value={secretWordInput}/>
        <div className="inline-flex" style={{ marginTop: "10%"}}>
        </div>
      </form>
      <button onClick={() => handleReset()}>Reset</button>
    </>
  )
}

export default App
