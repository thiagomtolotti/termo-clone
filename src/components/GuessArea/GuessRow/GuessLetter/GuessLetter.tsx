import clsx from "clsx";

interface GuessLetterProps {
  children: React.ReactNode;
  active?: boolean;
  isCorrectOrMisplaced?: "correct" | "misplaced";
  onClick(): void;
  isRowActive: boolean;
}

export const GuessLetter = ({
  active = false,
  children,
  isCorrectOrMisplaced,
  onClick,
  isRowActive,
}: GuessLetterProps) => {
  return (
    <div
      role="guess"
      className={clsx(
        "w-full flex items-center justify-center font-bold aspect-square rounded-md text-4xl box-border",
        isRowActive &&
          "bg-transparent border-4 border-brown-300 cursor-pointer",
        !isRowActive && Boolean(children) ? "bg-brown-100" : "bg-brown-400",
        active && "!border-b-8",
        isCorrectOrMisplaced === "correct" && "bg-green",
        isCorrectOrMisplaced === "misplaced" && "bg-yellow"
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
