import { ButtonVariants, PanelProps } from "@/types/watch";
import WatchButton from "../components/WatchButton";

const variants: ButtonVariants = {
  reset: "bg-rosyBrown text-white",
  activeLap: "bg-rosyBrown text-white",
  disabledLap: "bg-lightBrown text-gray-600",
  start: "bg-goldenRod text-white",
  stop: "bg-maroon text-white",
};

const ButtonPanel = ({ watchAction, haveStarted, isWatching }: PanelProps) => {
  const showReset: boolean = !isWatching && haveStarted;

  return (
    <div className="flex w-72 justify-between">
      {showReset ? (
        <WatchButton
          action={watchAction.reset}
          variant={variants.reset}
          content="Reset"
        />
      ) : (
        <WatchButton
          action={watchAction.lap}
          variant={haveStarted ? variants.activeLap : variants.disabledLap}
          content="Lap"
        />
      )}
      {!isWatching ? (
        <WatchButton
          action={watchAction.start}
          variant={variants.start}
          content="Start"
        />
      ) : (
        <WatchButton
          action={watchAction.stop}
          variant={variants.stop}
          content="Stop"
        />
      )}
    </div>
  );
};

export default ButtonPanel;
