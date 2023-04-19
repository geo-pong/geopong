import React from 'react'
import { useState } from 'react'
import './styles/App.css'
import PlayingField from './components/PlayingField'
import Scoreboard from './components/Scoreboard'

function App() {
  

  return (
    <div className="App">
      <div className='scoreboard-wrapper'>
        <Scoreboard />
      </div>
      <div className='playing-field-wrapper'>
        <PlayingField />
      </div>
    </div>
  );
}

export default App;
