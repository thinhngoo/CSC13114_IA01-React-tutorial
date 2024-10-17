import clsx from "clsx";
import game from "../helper";

import Square from "./Square.component";
import { SquareValue } from "../constants";
import type { HistoryRecord, SquareValues } from "../types";

type BoardProps = {
  xIsNext: boolean;
  squares: SquareValues;
  onPlay: (squares: HistoryRecord) => void;
};

export default function Board({ xIsNext, squares, onPlay }: BoardProps) {
  console.log(squares);
  const isFinished = game.isFinished(squares);
  const winPatterns = game.getWinPatterns(squares);

  function handleClick(index: number) {
    if (squares[index] !== SquareValue.Empty || isFinished) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) nextSquares[index] = SquareValue.X;
    else nextSquares[index] = SquareValue.O;

    onPlay({
      squares: nextSquares,
      move: nextSquares.filter(Boolean).length,
      location: { col: index % 3, row: Math.floor(index / 3) },
    });
  }

  return (
    <section className={clsx("grid grid-cols-3 gap-4", "size-[25rem] p-4", "bg-foreground")}>
      {squares.map((value, index) => {
        // console.log(index, winPatterns.includes(index));
        return (
          <Square
            key={index}
            value={value}
            onSquareClick={() => handleClick(index)}
            disabled={isFinished}
            highlight={winPatterns.includes(index)}
          />
        );
      })}
    </section>
  );
}
