"use client";
import { WatchAction } from "@/types/watch";
import { parseTotalTime } from "@/util/util";
import { useCallback, useEffect, useRef, useState } from "react";
import ButtonPanel from "./ButtonPanel";
import Laps from "./Laps";
import Maintime from "./Maintime";

export default function StopWatchApp() {
  const [isWatching, setIsWatching] = useState(false);
  const [haveStarted, setHaveStarted] = useState(false);
  const [currentLap, setCurrentLap] = useState(0);
  const [elapsedTimes, setElapsedTimes] = useState([0]);
  const startTimesRef = useRef<number[]>([0]);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

  const confirmLeave = useCallback((event: any) => {
    event.preventDefault();
    event.returnValue = "";
    return "表會停止喔";
  }, []);

  const watchAction: WatchAction = {
    start: () => {
      setIsWatching(true);
      setHaveStarted(true);
      const newStartTimes = [...startTimesRef.current];
      newStartTimes[currentLap] = Date.now() - elapsedTimes[currentLap];
      startTimesRef.current = newStartTimes;
    },
    reset: () => {
      setElapsedTimes([0]);
      startTimesRef.current = [0];
      setCurrentLap(0);
      setIsWatching(false);
      setHaveStarted(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    },
    lap: () => {
      const newStartTimes = [...startTimesRef.current, Date.now()];
      const newElapsedTimes = [...elapsedTimes, 0];
      setCurrentLap((prev) => prev + 1);
      setElapsedTimes(newElapsedTimes);
      startTimesRef.current = newStartTimes;
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
      newElapsedTimes[currentLap] =
        Date.now() - startTimesRef.current[currentLap];
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
  }, [isWatching, currentLap]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => confirmLeave(event);

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [confirmLeave]);

  return (
    <main className="mx-auto flex w-96 flex-col items-center justify-center gap-6 pt-12">
      <Maintime elapsedSum={parseTotalTime(elapsedTimes)} />
      <ButtonPanel
        isWatching={isWatching}
        haveStarted={haveStarted}
        watchAction={watchAction}
      />
      {haveStarted && <Laps elapsedTimes={elapsedTimes} />}
    </main>
  );
}
