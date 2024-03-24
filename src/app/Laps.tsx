import { Fragment } from "react";
import { formatTime } from "../util/util";

const Laps = ({ elapsedTimes }: { elapsedTimes: number[] }) => {
  const lapsWithCorrectOrder = elapsedTimes.toReversed();

  return (
    <div className="mt-6 grid w-80 grid-cols-2 gap-y-3">
      {lapsWithCorrectOrder.map((lap, index) => {
        return (
          <Fragment key={index}>
            <h3 className="text-xl font-medium text-thistle">
              Lap {lapsWithCorrectOrder.length - index}:
            </h3>
            <h4 className="text-end text-xl font-medium text-thistle">
              {formatTime(lap)}
            </h4>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Laps;
