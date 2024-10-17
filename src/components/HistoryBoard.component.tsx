import { useState } from "react";
import clsx from "clsx";
import game from "../helper";
import type { HistoryRecord } from "../types";

type HistoryBoardProps = {
  onRollback: (move: number) => void;
  history: HistoryRecord[];
};

function formatLocation(location: { col: number; row: number }) {
  return `[${location.col + 1}, ${location.row + 1}]`;
}

export default function HistoryBoard({ onRollback, history }: HistoryBoardProps) {
  const [isDescending, setDescending] = useState(true);

  const movesList = history.map((historyRecord, move) => {
    const winner = game.calculateWinner(historyRecord.squares);
    const isFinished = game.isFinished(historyRecord.squares);
    const isCurrent = move === history.length - 1;
    const isFirst = move === 0;

    let description;
    if (isCurrent) {
      if (isFirst) description = "You are at game start";
      else if (isFinished)
        if (winner) description = `Player ${winner} win`;
        else description = "Draw";
      else description = `#${move} - You are at ${formatLocation(historyRecord.location!)}`;
    } else if (isFirst) {
      description = "Go to game start";
    } else {
      description = `#${move} - Go to ${formatLocation(historyRecord.location!)}`;
    }

    return (
      <li key={move} className={clsx("font-semibold", "relative")}>
        {isCurrent ? (
          <>
            <span className={clsx("bg-foreground", "inline-block p-2 rounded")}>{description}</span>
            <span
              className={clsx(
                "absolute top-0 left-0",
                "flex items-center",
                "h-full pr-3",
                "-translate-x-full"
              )}
            >
              ➤
            </span>
          </>
        ) : (
          <button
            className={clsx(
              "bg-foreground p-2 rounded",
              "hover:opacity-50 transition-opacity duration-200"
            )}
            onClick={() => onRollback(move)}
          >
            {description}
          </button>
        )}
      </li>
    );
  });

  return (
    <div className={clsx("absolute top-0 right-0", "w-60 p-6")}>
      <div className="flex">
        <h1 className={clsx("font-bold", "uppercase", "text-xl", "mb-4")}>history</h1>
        <button
          className={clsx("flex justify-center items-center", "bg-foreground ml-4 size-8")}
          onClick={() => setDescending(!isDescending)}
        >
          {isDescending ? "▼" : "▲"}
        </button>
      </div>
      <ol className="space-y-3">{isDescending ? movesList : movesList.reverse()}</ol>
    </div>
  );
}
