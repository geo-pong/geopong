import React, {useEffect, useState, useRef} from 'react'
import './../styles/PlayingField.css'
import GameOver from './GameOver';

/* Front-end to-do:::
- Create score state
- Create ball object
- Have ball move automatically 
  -refactor: wait for trigger
-Get ball to "bounce" off any wall
-get ball to "bounce " off paddle
-Design "game over" (ball x position is < paddleLeft x position)
-Adjust ball physics algo
-REFACTOR: change size from VH/VW to set pixels (fullscreen option?)
  -STRETCH: Paddle never moves beyond bounds of the board
*/


const PlayingField = ({
  score, 
  setScore,
}) => {
  
  // TODO: type any
  //establishing a useRef to help update paddle location
  const paddleLeftRef:any = useRef()
  const playingFieldRef:any = useRef()

  type boardDimensionsType = {
    leftBorder?: number,
    topBorder?: number,
    bottomBorder?: number,
    rightBorder?: number,
  }

  // type ballLocationType = {
  //   xAxis?: number,
  //   yAxis?: number
  // }
  const [ballXAxis, setBallXAxis] = useState(0)
  const [ballYAxis, setBallYAxis] = useState(0)
  const [paddleY, setPaddleY] = useState(0)
  // const [ballLocation, setBallLocation] = useState({
  //   xAxis:0,
  //   yAxis:0
  // })
  
  const [ballVelocity, setBallVelocity] = useState({
    verticalDirection: 'right',
    horizontalDirection: 'up',
    angle: 0
  })
  
  const [someText, setSomeText] = useState('');
  const boardDimensions: boardDimensionsType = {};



  //useEffect to initialize board's properties after board has loaded
  useEffect(() => {
    console.log('before: ',someText);
    //setting the boardDimensions: this is where the ball will bounce off of (the edges of the map)
    boardDimensions.leftBorder = 0
    boardDimensions.topBorder = playingFieldRef.current.offsetTop
    boardDimensions.bottomBorder = playingFieldRef.current.offsetTop + playingFieldRef.current.offsetHeight
    boardDimensions.rightBorder = playingFieldRef.current.offsetWidth
    console.log(boardDimensions)
    //setting initial ball location at center of the screen
    // setBallXAxis({
    //   xAxis: (boardDimensions.rightBorder - boardDimensions.leftBorder) / 2,
    //   yAxis: ((boardDimensions.bottomBorder - boardDimensions.topBorder) / 2) + boardDimensions.topBorder,
    // })

    // setBallYAxis
    
    setBallXAxis((boardDimensions.rightBorder - boardDimensions.leftBorder) / 2)
    setBallYAxis(((boardDimensions.bottomBorder - boardDimensions.topBorder) / 2) + boardDimensions.topBorder)

    //Adds 'mousemove' event listener whenever the document loads
    /*
    document.addEventListener('mousemove', (event) => {
      console.log(event);
      const {clientX, clientY} = event;
      // console.log('mousePosition: ', clientX, clientY)
      setPaddleY(clientY)
      console.log('paddleY: ',paddleY)
      // Previous function used to reassign paddle height; paddle height now placed in State (easier to reference)
      // paddleLeftRef.current.style.transform = `translate3d(0px, ${mouseY}px, 0px)`
    })
    */
    // console.log('ball location x-axis: ', ballXAxis);
    // console.log('ball location y-axis: ', ballYAxis);
    // // console.log('ball location before move func: ', ballXAxis);
    // setSomeText('cat');
    // console.log(someText);
    // while:
    //  ball x-axis is > boardDimensions.leftBorder and < rightBorder move()
    // ball y-axis is < topBorder and > bottomBorder


    // while (ballLocation.xAxis >= boardDimensions.leftBorder && 
    //   ballLocation.xAxis <= boardDimensions.rightBorder && 
    //   ballLocation.yAxis <= boardDimensions.bottomBorder &&
    //   ballLocation.yAxis >= boardDimensions.topBorder) {
    //     move();

    //   }
    
    move()
    

    // document.addEventListener('keydown: ')
  }, [])

  
  function move(){
    // console.log('ball location when move func is invoked: ', ballXAxis, ballYAxis)
    // const currentX = ballXAxis;
    // const currentY = ballYAxis;
    // const angle = ballVelocity.angle;
    // const verticalDirection = ballVelocity.verticalDirection;
    // const horizontalDirection = ballVelocity.horizontalDirection;

    // //hypotenuse = gross distance travelled per second.
    // const hypotenuse = 10

    // let xDistance = hypotenuse * Math.cos(angle);
    // let yDistance = hypotenuse * Math.sin(angle);

    // console.log('Math.sin(angle): ', Math.sin(angle));
    // console.log('Math.cos(angle): ', Math.cos(angle));

    // console.log('xDistance: ', xDistance);
    // console.log('yDistance: ', yDistance);

    // if(horizontalDirection === 'left') xDistance *= -1;
    // if(verticalDirection === 'up') yDistance *= -1;

    // const ballNewLocation = {
    //   xAxis: currentX + xDistance,
    //   yAxis: currentY + yDistance
    // }

    // console.log('ballNewLocation.xAxis: ', ballNewLocation.xAxis);
    // console.log('ballNewLocation.yAxis: ', ballNewLocation.yAxis);
    
    // setBallXAxis(ballNewLocation.xAxis)
    // setBallYAxis(ballNewLocation.yAxis)
    const newX = ballXAxis + 10;
    const newY = ballYAxis + 10;
    setBallXAxis(newX);
    setBallYAxis(newY);
    console.log('ball location after move func:  ', ballXAxis, ballYAxis);
    // if(ballXAxis <= boardDimensions.leftBorder || ballXAxis >= boardDimensions.rightBorder) {
    //   console.log('ball loc x-axis: ', ballLocation.xAxis );
    //   bounce('leftOrRight');
    // }
    // if(ballYAxis <= boardDimensions.topBorder || ballYAxis >= boardDimensions.bottomBorder) bounce('topOrBottom'); 


    // setTimeout(() => move(), 1000);
    
  }
  // randomize vertical direction 

  console.log('outside of move X: ', ballXAxis, 'Y: ', ballYAxis);

  function bounce(wall){
    if(wall === 'leftOrRight'){
      if (ballVelocity.verticalDirection === 'right') ballVelocity.verticalDirection = 'left';
      else ballVelocity.verticalDirection = 'right';
      const newAngle = Math.floor(Math.random() * 90) 
      ballVelocity.angle = newAngle

    } else if(wall === 'topOrBottom'){
      if (ballVelocity.horizontalDirection === 'up') ballVelocity.horizontalDirection = 'down';
      else ballVelocity.horizontalDirection = 'up'
    }
  }

  return(
    <div className='main-field' ref={playingFieldRef}>
      <div id='paddle-left' style={{top: paddleY}} ref={paddleLeftRef}/>
      <div id='ball' style={{top: ballYAxis, left: ballXAxis}}></div>
    </div>
  );
}

export default PlayingField;