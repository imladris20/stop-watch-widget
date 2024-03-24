import { ButtonProps } from "@/types/watch";

const WatchButton = ({ action, variant, content }: ButtonProps) => {
  const shouldDisabled = variant === "bg-lightBrown text-gray-600";

  return (
    <button
      disabled={shouldDisabled}
      onClick={action}
      className={`${variant} ${shouldDisabled && "cursor-not-allowed"} h-32 w-32 rounded-full border-4 border-solid border-gray-200 text-2xl font-medium`}
    >
      {content}
    </button>
  );
};

export default WatchButton;
