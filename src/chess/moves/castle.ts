import { Position } from "../interfaces/position";
import { Move } from "./move";
import { Rook } from "../pieces/rook/rook";

export class Castle extends Move {
  rook: Rook;
  rookPosition: Position;
  constructor(goalPosition: Position, rook: Rook, rookPosition: Position) {
    super(goalPosition);
    this.rook = rook;
    this.rookPosition = rookPosition;
  }

  getRook(): Rook {
    return this.rook;
  }

  getRookPosition(): Position {
    return this.rookPosition;
  }
}
