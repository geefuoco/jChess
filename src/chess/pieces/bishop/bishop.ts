import { SlidingPiece } from "../slidingPiece";

export class Bishop extends SlidingPiece {
  static MOVE_SET = [
    [-1, 1],
    [-1, -1],
    [1, 1],
    [1, -1]
  ];

  getPieceCode(): string {
    return this.color === "white" ? "B" : "b";
  }
}
