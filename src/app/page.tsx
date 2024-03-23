"use client";
import { Fragment, useEffect, useRef, useState } from "react";
import { formatTime } from "../util/util";

const buttonBasicStyle =
  "h-32 w-32 rounded-full border-4 border-solid border-gray-200 text-2xl font-medium";

export default function StopWatchApp() {
  const [isWatching, setIsWatching] = useState(false);
  const [haveStarted, setHaveStarted] = useState(false);
  const [currentLap, setCurrentLap] = useState(1);
  const [elapsedTimes, setElapsedTimes] = useState([0, 0]);
  const [startTimes, setStartTimes] = useState([0, 0]);

  //* To memorize id of interval
  const intervalRef = useRef<NodeJS.Timeout | number>(0);
  //* unit will be millisecond

  const watchAction = {
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
      clearInterval(intervalRef.current);
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
      clearInterval(intervalRef.current);
    },
  };

  useEffect(() => {
    if (isWatching) {
      intervalRef.current = setInterval(() => {
        const newElapsedTimes = [...elapsedTimes];
        newElapsedTimes[0] = Date.now() - startTimes[0];
        newElapsedTimes[currentLap] = Date.now() - startTimes[currentLap];
        setElapsedTimes(newElapsedTimes);
      }, 10);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [isWatching, elapsedTimes, currentLap, startTimes]);

  return (
    <main className="mx-auto flex w-96 flex-col items-center justify-center gap-6 pt-12">
      <h2 className="text-7xl font-medium text-lightSalmon">
        {formatTime(elapsedTimes[0])}
      </h2>
      <div className="flex w-72 justify-between">
        {!isWatching && haveStarted ? (
          <button
            onClick={watchAction.reset}
            className={`${buttonBasicStyle} bg-rosyBrown text-white`}
          >
            Reset
          </button>
        ) : (
          <button
            disabled={!haveStarted}
            onClick={watchAction.lap}
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
            onClick={watchAction.stop}
            className={`${buttonBasicStyle} bg-maroon text-white`}
          >
            Stop
          </button>
        )}
      </div>
      {elapsedTimes[1] !== 0 && (
        <div className="mt-6 grid w-80 grid-cols-2 gap-y-3">
          {elapsedTimes.toReversed().map((lap, reverseIndex) => {
            const lapsAmount = elapsedTimes.length - 1;

            if (reverseIndex === lapsAmount) {
              return;
            }
            return (
              <Fragment key={reverseIndex}>
                <h3 className="text-xl font-medium text-thistle">
                  Lap {lapsAmount - reverseIndex}:
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
