import React, { useState, useEffect, useRef } from "react";
import "./StopWatch.css"

export const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);
  const startTimerRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimerRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(!isRunning);
    startTimerRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);

  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  function formatTime() {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / (1000) % 60);
    let miliSeconds = Math.floor((elapsedTime % 1000) / 10);


    minutes=String(minutes).padStart(2,"0")
    seconds=String(seconds).padStart(2,"0")
    miliSeconds=String(miliSeconds).padStart(2,"0")

    // console.log("minutes",minutes)
    // console.log("seconds",seconds)
    // console.log("miliSeconds",miliSeconds)

    return `${minutes} : ${seconds} : ${miliSeconds}`;

  }

  return (
    <>
      <div className="stopwatch">
        <h4 className="timerText">Countdown Timer</h4>
        <div className="display">{formatTime()}</div>
        <div className="controls">
        <button className="start" onClick={start}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
          <button className="stop" onClick={stop}>
            Stop
          </button>
          <button className="reset" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </>
  );
};
