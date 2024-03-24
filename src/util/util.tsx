export const formatTimeUnit = (num: number) => {
  return String(Math.floor(num)).padStart(2, "0");
};

export const formatTime = (elapsedTime: number) => {
  const timebase = 60;
  const accuracyOfMillisecond = 10;
  const secondUnit = 1000;
  const minuteUnit = secondUnit * timebase;
  const hourUnit = minuteUnit * timebase;

  const hours: string = formatTimeUnit(elapsedTime / hourUnit);
  const minutes: string = formatTimeUnit((elapsedTime / minuteUnit) % timebase);
  const seconds: string = formatTimeUnit((elapsedTime / secondUnit) % timebase);
  const milliseconds: string = formatTimeUnit(
    (elapsedTime % secondUnit) / accuracyOfMillisecond,
  );

  if (Number(hours) < 1) {
    return `${minutes}:${seconds}.${milliseconds}`;
  }
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
