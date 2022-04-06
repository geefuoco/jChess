import { SlidingPiece } from "../slidingPiece";

export class Queen extends SlidingPiece {
  static MOVE_SET = [
    [0, 1],
    [1, 0],
    [-1, 0],
    [0, -1],
    [1, 1],
    [1, -1],
    [-1, -1],
    [-1, 1]
  ];
}
