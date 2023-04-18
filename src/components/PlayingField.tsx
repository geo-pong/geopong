import React, { useEffect, useState } from 'react';
import './../styles/PlayingField.css';
import GameOver from './GameOver.tsx';

const PlayingField = ({ score, setScore }) => {
  const scoreboard = document.getElementById('scoreboard-wrapper');
  const scoreboardHeight = scoreboard?.offsetHeight;

  const paddleLeftRef = React.useRef(null);

  useEffect(() => {
    setScore(7);
    document.addEventListener('mousemove', (event) => {
      const { clientX, clientY } = event;
      const mouseY = clientY - paddleLeftRef.current.clientHeight;
      paddleLeftRef.current.style.transform = `translate3d(0px, ${mouseY}px, 0px)`;
    });
  }, []);

  return (
    <div className="main-field">
      <div
        id="paddle-left"
        ref={paddleLeftRef}
        onMouseMove={(ev) => handleMoveMouse(ev)}
      />
      <GameOver score={score} />
    </div>
  );
};

export default PlayingField;
