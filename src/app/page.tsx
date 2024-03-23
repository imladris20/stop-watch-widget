"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { formatTime } from "../util/util";

const buttonBasicStyle =
  "h-32 w-32 rounded-full border-4 border-solid border-gray-200 text-2xl font-medium";

export default function StopWatchApp() {
  //* As dependency of useEffect to decide timing of recalculate elapsed time
  const [isWatching, setIsWatching] = useState(false);
  const [haveStarted, setHaveStarted] = useState(false);
  const [currentLap, setCurrentLap] = useState(0);

  //* unit will be millisecond
  const [elapsedTime, setElapsedTime] = useState([0, 0]);

  //* To memorize id of interval
  const intervalRef = useRef<NodeJS.Timeout | number>(0);

  //* unit will be millisecond
  const startTimeRef = useRef([0, 0]);

  const watchAction = {
    start: () => {
      setIsWatching(true);
      setHaveStarted(true);
      setCurrentLap(1);
      startTimeRef.current[0] = Date.now() - elapsedTime[0];
      startTimeRef.current[1] = Date.now() - elapsedTime[1];
    },
    reset: () => {
      setElapsedTime([0, 0]);
      setCurrentLap(0);
      setIsWatching(false);
      setHaveStarted(false);
    },
    lap: () => {
      console.log("it lap");
      setCurrentLap((prev) => prev + 1);
    },
    pause: () => {
      setIsWatching(false);
    },
  };

  useEffect(() => {
    if (isWatching) {
      intervalRef.current = setInterval(() => {
        const newElapsedTime = [...elapsedTime];
        newElapsedTime[0] = Date.now() - startTimeRef.current[0];
        newElapsedTime[1] = Date.now() - startTimeRef.current[1];
        setElapsedTime(newElapsedTime);
      }, 20);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isWatching, elapsedTime]);

  return (
    <main className="mx-auto flex w-96 flex-col items-center justify-center gap-6 pt-12">
      <h2 className="text-7xl font-medium text-lightSalmon">
        {formatTime(elapsedTime[0])}
      </h2>
      <div className="flex w-72 justify-between">
        {!isWatching && haveStarted ? (
          <button
            onClick={watchAction.reset}
            className={`${buttonBasicStyle} bg-rosyBrown text-white`}
          >
            reset
          </button>
        ) : (
          <button
            disabled={!haveStarted}
            className={`${buttonBasicStyle} ${haveStarted ? "bg-rosyBrown text-white" : "bg-lightBrown text-gray-600"}`}
          >
            Lap
          </button>
        )}
        {!isWatching ? (
          <button
            onClick={watchAction.start}
            className={`${buttonBasicStyle} bg-goldenRod text-white`}
          >
            Start
          </button>
        ) : (
          <button
            onClick={watchAction.pause}
            className={`${buttonBasicStyle} bg-maroon text-white`}
          >
            pause
          </button>
        )}
      </div>
      {elapsedTime[1] !== 0 && (
        <div className="mt-6 grid w-80 grid-cols-2 gap-y-3">
          {elapsedTime.map((lap, index) => {
            if (index === 0) {
              return;
            }
            return (
              <Fragment key={index}>
                <h3 className="text-xl font-medium text-thistle">
                  Lap {index}:
                </h3>
                <h4 className="text-end text-xl font-medium text-thistle">
                  {formatTime(lap)}
                </h4>
              </Fragment>
            );
          })}
        </div>
      )}
    </main>
  );
}
