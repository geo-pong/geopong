import React, { useEffect, useRef, useState } from 'react';

const Pong: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Game variables
    const paddleHeight = 100;
    const paddleWidth = 10;
    const aiSpeed = 3;
    let animationFrame: number;
    let ballX = width / 2;
    let ballY = height / 2;
    let ballSpeedX = 7.5;
    let ballSpeedY = 4.5;
    let paddle1Y = height / 2 - 50;
    let paddle2Y = height / 2 - 50;
    let player1Score = 0;
    let player2Score = 0;

    // Initialize game objects
    const init = () => {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keyup', handleKeyUp);
      document.addEventListener('mousemove', handleMouseMove);
    }

    const update = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      // Update paddle positions
      if (keys['ArrowUp'] && paddle1Y > 0) {
        paddle1Y -= 5;
      }

      if (keys['ArrowDown'] && paddle1Y < height - paddleHeight) {
        paddle1Y += 5;
      }

      // Ball bouncing off the walls and paddles
      if (ballY > height - 10 || ballY < 10) {
        ballSpeedY = -ballSpeedY;
      }

      if (
        (ballX < 20 && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ||
        (ballX > width - 30 &&
          ballY > paddle2Y &&
          ballY < paddle2Y + paddleHeight)
      ) {
        ballSpeedX = -ballSpeedX;
      }

      // Ball out of bounds (left and right)
      if (ballX < 0) {
        player2Score++;
        resetBall();
      } else if (ballX > width) {
        player1Score++;
        resetBall();
      }

      // Old AI for right paddle
      // paddle2Y = ballY - paddleHeight / 2;

      // New AI for right paddle
      if (paddle2Y + paddleHeight / 2 < ballY - aiSpeed) {
        paddle2Y += aiSpeed;
      } else if (paddle2Y + paddleHeight / 2 > ballY + aiSpeed) {
        paddle2Y -= aiSpeed;
      }

      // Ensure paddles stay within canvas bounds
      paddle1Y = Math.max(0, Math.min(height - paddleHeight, paddle1Y));
      paddle2Y = Math.max(0, Math.min(height - paddleHeight, paddle2Y));
    }

    // Draw game objects
    const draw = () => {
      // Clear the canvas
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      // Draw paddles
      ctx.fillStyle = 'white';
      ctx.fillRect(10, paddle1Y, paddleWidth, paddleHeight);
      ctx.fillRect(width - 20, paddle2Y, paddleWidth, paddleHeight);

      // Draw divider
      drawVerticalDivider(ctx);

      // Draw scoreboard
      drawScoreboard(player1Score, player2Score);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ballX, ballY, 10, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
    }

    const loop = () => { 
      update();
      draw();

      animationFrame = requestAnimationFrame(loop);
    }

    // Key input handling
    const keys: { [key: string]: boolean } = {};

    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key] = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key] = false;
    };

    // Mouse input handling
    const handleMouseMove = (e: MouseEvent) => {
      const mouseY = e.clientY - canvas.getBoundingClientRect().top;
      paddle1Y = mouseY - paddleHeight / 2;
    }

    // Called in draw()
    const drawScoreboard = (score1: number, score2: number) => {
      ctx.font = '48px monospace';
      ctx.font = '48px monospace';
      ctx.fillStyle = 'white';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(score1.toString(), width / 2 - 100, 50);
      ctx.fillText(score2.toString(), width / 2 + 100, 50);
    };

    const drawVerticalDivider = () => {
      const dividerX = width / 2;
      const dashHeight = 50;
      const gapHeight = 30;
  
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
  
      for (let y = 0; y < height; y += dashHeight + gapHeight) {
        ctx.beginPath();
        ctx.moveTo(dividerX, y);
        ctx.lineTo(dividerX, y + dashHeight);
        ctx.stroke();
      }
    };

    // Called in draw()
    const resetBall = () => {
      ballX = width / 2;
      ballY = height / 2;
      ballSpeedX = -ballSpeedX;
    }

    init();
    loop();

    return () => {
      cancelAnimationFrame(animationFrame);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    }
  }, [width, height]);
    
  return <canvas ref={canvasRef} width={width} height={height} />
};

export default Pong;