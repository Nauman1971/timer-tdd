import './Timer.css';
import TimerButton from '../TimerButton/TimerButton';
import React, { useEffect, useRef, useState } from 'react';

const Timer = () => {

  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setmins] = useState<number>(0);
  const [isOn, setIson] = useState<boolean>()
  const timer = useRef<any>();

  useEffect(() => {
    if (isOn) {
      timer.current = setInterval(() => {

        if (seconds === 59) {
          setSeconds(0);
          setmins((prev: number) => prev + 1);
        }

        setSeconds((prev: number) => prev + 1)
      }, 1000);

    }
    return (() => {
      clearInterval(timer.current)
    })
  }, [isOn, seconds, minutes]);

  const stopTimer = () => {
    clearInterval(timer.current);
    setIson(false)
  }

  const resetTimer = () => {
    stopTimer();
    setmins(0);
    setSeconds(0);
  }

  function startTimer() {
    setIson(true);
  }

  return (
    <div className="timer-container">
      <div 
      data-test="time-display"
      className="time-display">
        {minutes}: {seconds < 10 ? `0${seconds}` : seconds}
      </div>
      <div data-test="buttons-container" className="timer-button-container">
        <TimerButton
          data-test="start-timer"
          buttonAction={startTimer}
          buttonValue={'Start'}
        />

        <TimerButton
          data-test="stop-timer"
          buttonAction={stopTimer}
          buttonValue={'Stop'}
        />

        <TimerButton
          data-test="reset-timer"
          buttonAction={resetTimer}
          buttonValue={'Reset'}
        />
      </div>
    </div>
  )
}

export default Timer;
