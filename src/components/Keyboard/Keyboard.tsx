import { Key } from "./Key/Key";

// prettier-ignore
const LETTER_POSITIONS = [
  "Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Backspace","Z","X","C","V","B","N","M", "Enter",
];

export const Keyboard = () => {
  return (
    <div className={`grid grid-rows-3 w-full px-4 shrink-0 gap-1 uppercase`}>
      {LETTER_POSITIONS.map((letter) => (
        <Key>{letter}</Key>
      ))}
    </div>
  );
};
