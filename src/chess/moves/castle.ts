import { Position } from "../interfaces/position";
import { Move } from "./move";
import { Rook } from "../pieces/rook/rook";

export class Castle extends Move {
  rook: Rook;
  move: Move;
  constructor(goalPosition: Position, rook: Rook, move: Move) {
    super(goalPosition);
    this.rook = rook;
    this.move = move;
  }
}
