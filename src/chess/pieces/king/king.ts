import { ChessBoard } from "../../board/chessboard";
import { Position } from "../../interfaces/position";
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
  }

  setChecked(bool: boolean) {
    this.inCheck = bool;
  }

  isChecked(): boolean {
    return this.inCheck;
  }
}