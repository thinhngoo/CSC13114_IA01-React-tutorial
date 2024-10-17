import { SquareValue } from "./constants";

export type SquareValues = SquareValue[]; // Array<SquareValue>(9)

export type HistoryRecord = {
  squares: SquareValues;
  move: number;
  location?: { col: number; row: number };
};
