import { ChessBoard } from "../../board/chessboard";
import { Position } from "../../interfaces/position";
import { Move } from "../../moves/move";
import { Piece } from "../piece";

export class King extends Piece {
  inCheck: boolean;
  static MOVE_SET = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1]
  ];

  constructor(board: ChessBoard, color: string, position: Position) {
    super(board, color, position);
    this.inCheck = false;
    this.legalMoves = this.generateMoveSet();
  }

  generateMoveSet(): Move[] {
    const moves = super.generateMoveSet();
    const invalidPositions = this.board.getAttackedSquares(this.color);
    return moves.filter((move) => {
      const pos = move.getGoalPosition();
      return !(JSON.stringify(pos) in invalidPositions);
    });
  }

  setChecked(bool: boolean) {
    this.inCheck = bool;
  }

  isChecked(): boolean {
    return this.inCheck;
  }

  canCastle(rook: Piece): boolean {
    if (rook.constructor.name !== "Rook") {
      return false;
    }
    return !this.inCheck && !this.hasMoved && !rook.getHasMoved();
  }
  getPieceCode(): string {
    return this.color === "white" ? "K" : "k";
  }
}
