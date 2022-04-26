import { ChessBoard, Color } from "../../board/chessboard";
import { Position } from "../../interfaces/position";
import { Piece } from "../piece";

export class Knight extends Piece {
  constructor(board: ChessBoard, color: Color, position: Position) {
    super(board, color, position);
    this.legalMoves = this.generateMoveSet();
  }
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
  getPieceCode(): string {
    return this.color === "white" ? "N" : "n";
  }
}
