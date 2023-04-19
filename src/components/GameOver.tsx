import React from 'react';

const GameOver = ({score}) => {
  return (
    <>
      <div>GAME OVER</div>
      <div> HIGH SCORE: {score}</div>
    </>
  )
}

export default GameOver;