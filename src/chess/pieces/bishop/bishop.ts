import { SlidingPiece } from "../slidingPiece";

export class Bishop extends SlidingPiece {
  static MOVE_SET = [
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, -1]
  ];
}
