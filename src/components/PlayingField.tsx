import React, {useEffect, useState} from 'react'
import './../styles/PlayingField.css'

const PlayingField = () => {
  
  const scoreboard = document.getElementById('scoreboard-wrapper')
  const scoreboardHeight = scoreboard?.offsetHeight

  const paddleLeftRef = React.useRef(null)
  

  useEffect(() => {
    
    document.addEventListener('mousemove', (event) => {

      const {clientX, clientY} = event;
      const mouseY = clientY - paddleLeftRef.current.clientHeight
      paddleLeftRef.current.style.transform = `translate3d(0px, ${mouseY}px, 0px)`
    })
  }, [])



  return(
    <div className='main-field'>
      <div id='paddle-left' ref={paddleLeftRef} onMouseMove={(ev) => handleMoveMouse(ev)}/>
    </div>
  );
}

export default PlayingField