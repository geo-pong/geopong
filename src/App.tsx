import React from 'react'
import { useState } from 'react'
import './styles/App.css'
import PlayingField from './components/PlayingField'
import Scoreboard from './components/Scoreboard'

function App() {
  // score state will live here
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <div className='scoreboard-wrapper'>
        <Scoreboard score={score} setScore={setScore} />
      </div>
      <div className='playing-field-wrapper'>
        <PlayingField score={score} setScore={setScore}/>
      </div>
    </div>
  )
}

export default App
