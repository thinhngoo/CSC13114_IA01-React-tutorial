import { useState } from "react";
import clsx from "clsx";

import { Board, Title, HistoryBoard } from "./components";
import { ToastContainer, toast } from "react-toastify";
import { SquareValue } from "./constants";
import game from "./helper";
import type { HistoryRecord } from "./types";

export default function Game() {
  const [history, setHistory] = useState<HistoryRecord[]>([
    { squares: Array(9).fill(SquareValue.Empty), move: 0 },
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  function playHandler(historyRecord: HistoryRecord) {
    setHistory(history.concat(historyRecord));
    setCurrentMove((prev) => prev + 1);
    if (game.isFinished(historyRecord.squares)) {
      const winner = game.calculateWinner(historyRecord.squares);
      if (winner) {
        toast.success(`Player ${winner} win`);
      } else {
        toast.success("Draw");
      }
    }
  }

  function resetHandler() {
    setHistory([{ squares: Array(9).fill(SquareValue.Empty), move: 0 }]);
    setCurrentMove(0);
  }

  function rollbackHandler(move: number) {
    setCurrentMove(move);
    setHistory(history.slice(0, move + 1));
  }

  return (
    <div className={clsx("w-screen h-svh", "flex justify-center items-center", "relative")}>
      <main className="space-y-4">
        <Title />
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={playHandler} />

        <button
          className={clsx(
            "font-bold",
            "uppercase",
            "text-xl text-center",
            "bg-foreground w-full py-4 rounded",
            "hover:opacity-80 transition-opacity duration-200"
          )}
          onClick={resetHandler}
        >
          reset
        </button>
      </main>
      <HistoryBoard onRollback={rollbackHandler} history={history} />
      <ToastContainer />
    </div>
  );
}
