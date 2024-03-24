import WatchButton from "@/components/WatchButton";
import { variants } from "@/util/util";

interface watchAction {
  start: () => void;
  reset: () => void;
  lap: () => void;
  stop: () => void;
}

interface panelProps {
  isWatching: boolean;
  haveStarted: boolean;
  watchAction: watchAction;
}

const ButtonPanel = (props: panelProps) => {
  const { watchAction, haveStarted, isWatching } = props;

  const showReset = !isWatching && haveStarted;

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
