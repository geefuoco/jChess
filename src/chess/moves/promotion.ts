import { Position } from "../interfaces/position";
import { Piece } from "../pieces/piece";
import { Move } from "./move";

export class Promotion extends Move {
  attackedPiece: Piece | undefined;
  constructor(goalPosition: Position, attackedPiece?: Piece) {
    super(goalPosition);
    this.attackedPiece = attackedPiece;
  }

  getAttackedPiece(): Piece | undefined {
    return this.attackedPiece;
  }
}
