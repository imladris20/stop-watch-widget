import { formatTime } from "../util/util";

const Maintime = ({ display }: { display: number }) => {
  return (
    <h2 className="text-7xl font-medium text-lightSalmon">
      {formatTime(display)}
    </h2>
  );
};

export default Maintime;
