import { Position } from "../interfaces/position";
import { Piece } from "../pieces/piece";
import { Move } from "./move";

export class Capture extends Move {
  attackedPiece: Piece;

  constructor(goalPosition: Position, attackedPiece: Piece) {
    super(goalPosition);
    this.attackedPiece = attackedPiece;
  }

  getAttackedPiece(): Piece {
    return this.attackedPiece;
  }
}
