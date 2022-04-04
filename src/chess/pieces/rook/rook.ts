import { SlidingPiece } from "../slidingPiece";

export class Rook extends SlidingPiece {
  static MOVE_SET = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];
}
