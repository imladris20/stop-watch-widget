"use client";
import { WatchAction } from "@/types/watch";
import { useEffect, useRef, useState } from "react";
import ButtonPanel from "./ButtonPanel";
import Laps from "./Laps";
import Maintime from "./Maintime";

export default function StopWatchApp() {
  const [isWatching, setIsWatching] = useState(false);
  const [haveStarted, setHaveStarted] = useState(false);
  const [currentLap, setCurrentLap] = useState(1);
  const [startTimes, setStartTimes] = useState([0, 0]);
  const [elapsedTimes, setElapsedTimes] = useState([0, 0]);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

  const watchAction: WatchAction = {
    start: () => {
      setIsWatching(true);
      setHaveStarted(true);
      const newStartTimes = [...startTimes];
      newStartTimes[0] = Date.now() - elapsedTimes[0];
      newStartTimes[currentLap] = Date.now() - elapsedTimes[currentLap];
      setStartTimes(newStartTimes);
    },
    reset: () => {
      setElapsedTimes([0, 0]);
      setStartTimes([0, 0]);
      setCurrentLap(1);
      setIsWatching(false);
      setHaveStarted(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    lap: () => {
      const newStartTimes = [...startTimes, Date.now()];
      const newElapsedTimes = [...elapsedTimes, 0];
      setCurrentLap((prev) => prev + 1);
      setElapsedTimes(newElapsedTimes);
      setStartTimes(newStartTimes);
    },
    stop: () => {
      setIsWatching(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
  };

  useEffect(() => {
    const updateElapsedTimes = (elapsedTimes: number[]) => {
      const newElapsedTimes = [...elapsedTimes];
      newElapsedTimes[0] = Date.now() - startTimes[0];
      newElapsedTimes[currentLap] = Date.now() - startTimes[currentLap];
      return newElapsedTimes;
    };

    if (isWatching) {
      intervalRef.current = setInterval(() => {
        setElapsedTimes((prev) => updateElapsedTimes(prev));
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWatching, currentLap, startTimes]);

  return (
    <main className="mx-auto flex w-96 flex-col items-center justify-center gap-6 pt-12">
      <Maintime display={elapsedTimes[0]} />
      <ButtonPanel
        isWatching={isWatching}
        haveStarted={haveStarted}
        watchAction={watchAction}
      />
      {haveStarted && <Laps elapsedTimes={elapsedTimes} />}
    </main>
  );
}
