import clsx from "clsx";
import { SquareValue } from "../constants";

type SquareProps = {
  value: SquareValue;
  onSquareClick: () => void;
  disabled: boolean;
  highlight?: boolean;
};

export default function Square({ value, onSquareClick, disabled, highlight }: SquareProps) {
  const symbol = value === SquareValue.X ? "❌" : value === SquareValue.O ? "⭕" : "";
  const isDisabled = value !== SquareValue.Empty || disabled;
  return (
    <button
      onClick={onSquareClick}
      disabled={isDisabled}
      className={clsx(
        highlight ? "bg-[#064a03]" : "bg-background",
        isDisabled
          ? !highlight && "bg-background/[.7]"
          : "hover:bg-hover transition-colors duration-200",
        "relative"
      )}
    >
      <span
        className={clsx(
          "size-full",
          "absolute top-0 left-0",
          "flex justify-center items-center",
          "text-5xl",
          "font-bold"
        )}
      >
        {symbol}
      </span>
    </button>
  );
}
