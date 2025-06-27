import { useState, useEffect, useRef } from "react";

interface TimerProps {
  initialMinutes: number; // in seconds
  onTimeUp?: () => void;
}

const Timer = (props: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(props.initialMinutes * 60);
  const [isTicking, setIsTicking] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [sessionsCount, setSessionsCount] = useState(0);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };

  //start or stop the timer
  const toggleTimer = () => {
    setIsTicking((prev) => !prev);
  };

  const resetTimer = () => {
    setIsTicking(false);
    setTimeLeft(props.initialMinutes * 60);
  };

  const resetAll = () => {
    resetTimer();
    setSessionsCount(0);
  };

  useEffect(() => {
    if (isTicking && intervalRef.current === null) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            intervalRef.current = null;
            setSessionsCount((count) => count + 1);
            if (props.onTimeUp) props.onTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isTicking && intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isTicking]);

  return (
    <div>
      <div>
        <h1>{formatTime(timeLeft)}</h1>
        <button onClick={toggleTimer}>{isTicking ? "Pause" : "Start"}</button>
        <button onClick={resetTimer}>Reset timer</button>
        <button onClick={resetAll}>Reset sessions</button>
      </div>
      <p>Focus sessions done: {sessionsCount} </p>
    </div>
  );
};
export default Timer;
