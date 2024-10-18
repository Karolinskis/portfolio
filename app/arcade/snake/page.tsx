"use client";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../../components/ui/button";

const canvasWidth = 600;
const canvasHeight = 600;
const maxSpeed = 100;
const initialSpeed = 200;
const snakeSize = 20;

type Position = {
  x: number;
  y: number;
};

const getRandomPosition = (snake: Position[]): Position => {
  let position: Position;
  let isOnSnake: boolean;

  do {
    position = {
      x: Math.floor(Math.random() * (canvasWidth / snakeSize)) * snakeSize,
      y: Math.floor(Math.random() * (canvasHeight / snakeSize)) * snakeSize,
    };

    isOnSnake = snake.some(
      (segment) => segment.x === position.x && segment.y === position.y
    );
  } while (isOnSnake);

  return position;
};

export default function SnakeGame() {
  const [snake, setSnake] = useState<Position[]>([
    {
      x: Math.floor(canvasWidth / 2 / snakeSize) * snakeSize,
      y: Math.floor(canvasHeight / 2 / snakeSize) * snakeSize,
    },
  ]);
  const [food, setFood] = useState<Position>(getRandomPosition([]));
  const [direction, setDirection] = useState<string>("RIGHT");
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [youWin, setYouWin] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(initialSpeed);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [leaderboard, setLeaderboard] = useState<
    { username: string; score: number }[]
  >([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const keyMapping: { [key: string]: string } = {
    ArrowUp: "UP",
    ArrowDown: "DOWN",
    ArrowLeft: "LEFT",
    ArrowRight: "RIGHT",
    w: "UP",
    s: "DOWN",
    a: "LEFT",
    d: "RIGHT",
  };

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, score: score }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error || "Failed to submit score");
      } else {
        resetGame();
        fetchLeaderboard();
      }
    } catch (error) {
      setError("Failed to submit score");
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Escape") {
        if (!isStarted) {
          setIsStarted(true);
        } else {
          setIsPaused(!isPaused);
        }
        return;
      }

      if (isPaused) return;

      if (e.key in keyMapping) {
        const newDirection = keyMapping[e.key];
        if (
          (newDirection === "UP" && direction !== "DOWN") ||
          (newDirection === "DOWN" && direction !== "UP") ||
          (newDirection === "LEFT" && direction !== "RIGHT") ||
          (newDirection === "RIGHT" && direction !== "LEFT")
        ) {
          setDirection(newDirection);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [direction, isPaused]);

  useEffect(() => {
    if (gameOver || youWin || isPaused || !isStarted) return;

    const interval = setInterval(() => {
      moveSnake();
    }, speed);

    return () => clearInterval(interval);
  }, [snake, direction, gameOver, youWin, speed, isPaused, isStarted]);

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case "UP":
        head.y -= snakeSize;
        break;
      case "DOWN":
        head.y += snakeSize;
        break;
      case "LEFT":
        head.x -= snakeSize;
        break;
      case "RIGHT":
        head.x += snakeSize;
        break;
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      const newFood = getRandomPosition(newSnake);
      if (newFood.x === -1 && newFood.y === -1) {
        setYouWin(true);
      } else {
        setFood(newFood);
        setScore(score + 1);
        setSpeed((speed) => Math.max(maxSpeed, initialSpeed - score * 10));
      }
    } else {
      newSnake.pop();
    }

    if (checkCollision(head, newSnake)) {
      setGameOver(true);
      if (score > highScore) {
        setHighScore(score);
      }
    } else {
      setSnake(newSnake);
    }
  };

  const checkCollision = (head: Position, snake: Position[]) => {
    if (
      head.x < 0 ||
      head.x >= canvasWidth ||
      head.y < 0 ||
      head.y >= canvasHeight
    ) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    return false;
  };

  const resetGame = () => {
    setSnake([
      {
        x: Math.floor(canvasWidth / 2 / snakeSize) * snakeSize,
        y: Math.floor(canvasHeight / 2 / snakeSize) * snakeSize,
      },
    ]);
    setFood(getRandomPosition([]));
    setDirection("RIGHT");
    setGameOver(false);
    setYouWin(false);
    setScore(0);
    setSpeed(initialSpeed);
    setIsPaused(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.fillStyle = "green";
      snake.forEach((segment) => {
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
      });

      ctx.fillStyle = "red";
      ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
    }
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center relative">
      <div className="text-2xl mb-4">Score: {score}</div>
      <div className="text-xl mb-4">High Score: {highScore}</div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          className="border border-gray-200 dark:border-gray-800"
        />
        {(gameOver || youWin) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            {gameOver ? (
              <div className="text-4xl text-red-600 mb-4">Game Over</div>
            ) : (
              <div className="text-4xl text-green-600 mb-4">You Win!</div>
            )}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center"
            >
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="mb-4 p-2 border border-gray-300 rounded"
              />
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <Button
                variant={"default"}
                type="submit"
                className="mb-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition-colors duration-300"
              >
                Submit Score
              </Button>
            </form>
            <Button
              variant={"secondary"}
              className="hover:bg-gray-400 transition-colors duration-300"
              onClick={resetGame}
            >
              Restart
            </Button>
          </div>
        )}
        {isPaused && !gameOver && !youWin && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="text-4xl text-yellow-600">Game Paused</div>
            <div className="mt-4 text-gray-600">Press space to resume</div>
          </div>
        )}
        {!isStarted && !gameOver && !youWin && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
            <div className="text-4xl text-white mb-4">Press Space to Start</div>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col justify-between h-full w-full max-w-xl p-6 border border-gray-200 rounded-lg shadow dark:border-gray-700">
        <div className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-gray-800 dark:text-gray-200 font-bold">
            Ranking
          </span>
          <span className="text-gray-800 dark:text-gray-200 font-bold">
            Name
          </span>
          <span className="text-gray-800 dark:text-gray-200 font-bold">
            Score
          </span>
        </div>
        <ul>
          {leaderboard.map((entry, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 border-b border-gray-200 dark:border-gray-700 last:border-none"
            >
              <span className="text-gray-800 dark:text-gray-200 mr-4">
                {index + 1}
              </span>
              <span className="text-gray-800 dark:text-gray-200 mr-4">
                {entry.username}
              </span>
              <span className="text-blue-500 dark:text-blue-400">
                {entry.score}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
