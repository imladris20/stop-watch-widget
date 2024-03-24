export interface WatchAction {
  start: () => void;
  reset: () => void;
  stop: () => void;
  lap: () => void;
}

export interface PanelProps {
  isWatching: boolean;
  haveStarted: boolean;
  watchAction: WatchAction;
}

export interface ButtonVariants {
  reset: string;
  activeLap: string;
  disabledLap: string;
  start: string;
  stop: string;
}

export interface ButtonProps {
  action: () => void;
  variant: string;
  content: string;
}
