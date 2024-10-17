import { SquareValues } from "./types";

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function calculateWinner(squares: SquareValues) {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function isFinished(squares: SquareValues) {
  return squares.every(Boolean) || Boolean(calculateWinner(squares));
}

function getWinPatterns(squares: SquareValues) {
  for (let i = 0; i < winPatterns.length; i++) {
    const [a, b, c] = winPatterns[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return winPatterns[i];
    }
  }
  return [];
}

function isDraw(squares: SquareValues) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

export default { calculateWinner, isFinished, getWinPatterns, isDraw };
