export const transformNumberToTwoBit = (num: number) => {
  return String(num).padStart(2, "0");
};

export const formatTime = (millisecondsHavePassed: number) => {
  const hours: string = transformNumberToTwoBit(
    Math.floor(millisecondsHavePassed / (1000 * 60 * 60)),
  );
  const minutes = transformNumberToTwoBit(
    Math.floor((millisecondsHavePassed / (1000 * 60)) % 60),
  );
  const seconds = transformNumberToTwoBit(
    Math.floor((millisecondsHavePassed / 1000) % 60),
  );
  const milliseconds = transformNumberToTwoBit(
    Math.floor((millisecondsHavePassed % 1000) / 10),
  );

  if (Number(hours) < 1) {
    return `${minutes}:${seconds}.${milliseconds}`;
  }

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export const variants = {
  reset: "bg-rosyBrown text-white",
  activeLap: "bg-rosyBrown text-white",
  disabledLap: "bg-lightBrown text-gray-600",
  start: "bg-goldenRod text-white",
  stop: "bg-maroon text-white",
};
