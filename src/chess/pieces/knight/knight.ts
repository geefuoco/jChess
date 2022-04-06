import { Piece } from "../piece";

export class Knight extends Piece {
  static MOVE_SET = [
    [-2, 1],
    [-2, -1],
    [2, 1],
    [2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2]
  ];
}
