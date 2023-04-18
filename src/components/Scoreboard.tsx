import React from 'react';
import './../styles/Scoreboard.css';
import geodude from '../assets/geodude.png';

const Scoreboard = ({ score, setScore }) => {
  return (
    <div className="board">
      <div id="game-title">
        GEOPONG
        <img id="logo" src={geodude} />{' '}
      </div>
      <div id="score">Score: {score}</div>
    </div>
  );
};

export default Scoreboard;
