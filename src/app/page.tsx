"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { formatTime } from "../util/util";

export default function StopWatchApp() {
  //* As dependency of useEffect to decide timing of recalculate elapsed time
  const [isWatching, setIsWatching] = useState(false);
  const [haveStarted, setHaveStarted] = useState(false);

  //* unit will be millisecond
  const [elapsedTime, setElapsedTime] = useState([0, 0]);

  //* To memorize id of interval
  const intervalRef = useRef<NodeJS.Timeout | number>(0);

  //* unit will be millisecond
  const startTimeRef = useRef(0);

  const watchAction = {
    start: () => {
      setIsWatching(true);
      setHaveStarted(true);
      startTimeRef.current = Date.now() - elapsedTime[0];
    },
    reset: () => {
      setElapsedTime([0, 0]);
      setIsWatching(false);
      setHaveStarted(false);
    },
    lap: () => {
      console.log("it lap");
    },
    pause: () => {
      setIsWatching(false);
    },
  };

  useEffect(() => {
    if (isWatching) {
      intervalRef.current = setInterval(() => {
        const newElapsedTime = [...elapsedTime];
        newElapsedTime[0] = Date.now() - startTimeRef.current;
        newElapsedTime[1] = Date.now() - startTimeRef.current;
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
            className="h-32 w-32 rounded-full border-4 border-solid border-gray-200 bg-rosyBrown text-2xl font-medium text-white"
          >
            reset
          </button>
        ) : (
          <button
            disabled
            className={`h-32 w-32 rounded-full border-4 border-solid border-gray-200 ${haveStarted ? "bg-rosyBrown text-white" : "bg-lightBrown text-gray-600"} text-2xl font-medium`}
          >
            Lap
          </button>
        )}
        {!isWatching ? (
          <button
            onClick={watchAction.start}
            className="h-32 w-32 rounded-full border-4 border-solid border-gray-200 bg-goldenRod text-2xl font-medium text-white"
          >
            Start
          </button>
        ) : (
          <button
            onClick={watchAction.pause}
            className="h-32 w-32 rounded-full border-4 border-solid border-gray-200 bg-maroon text-2xl font-medium text-white"
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
