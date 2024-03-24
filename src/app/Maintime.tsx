import { formatTime } from "../util/util";

const Maintime = ({ elapsedSum: totalTime }: { elapsedSum: number }) => {
  return (
    <h2 className="text-7xl font-medium text-lightSalmon">
      {formatTime(totalTime)}
    </h2>
  );
};

export default Maintime;
