import { useState, useEffect } from 'react';

const SECOND = 1_000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

interface Timer {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export default function useTimer(
  deadline: string | number | Date,
  interval: number = SECOND,
): Timer {
  const [timespan, setTimespan] = useState<number>(
    new Date(deadline).getTime() - Date.now(),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimespan((_timespan) => _timespan - interval);
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  /* If the initial deadline value changes */
  useEffect(() => {
    setTimespan(new Date(deadline).getTime() - Date.now());
  }, [deadline]);

  if (
    Math.floor(timespan / DAY) <= 0 &&
    Math.floor((timespan / HOUR) % 24) <= 0 &&
    Math.floor((timespan / SECOND) % 60) <= 0
  ) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00',
    };
  }

  return {
    days: Math.floor(timespan / DAY)
      .toString()
      .padStart(2, '0'),
    hours: Math.floor((timespan / HOUR) % 24)
      .toString()
      .padStart(2, '0'),
    minutes: Math.floor((timespan / MINUTE) % 60)
      .toString()
      .padStart(2, '0'),
    seconds: Math.floor((timespan / SECOND) % 60)
      .toString()
      .padStart(2, '0'),
  };
}
