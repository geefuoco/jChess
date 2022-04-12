import kingBlack from "../../assets/king_black.png";
import kingWhite from "../../assets/king_white.png";
import bishopBlack from "../../assets/bishop_black.png";
import bishopWhite from "../../assets/bishop_white.png";
import knightBlack from "../../assets/knight_black.png";
import knightWhite from "../../assets/knight_white.png";
import pawnBlack from "../../assets/pawn_black.png";
import pawnWhite from "../../assets/pawn_white.png";
import queenBlack from "../../assets/queen_black.png";
import queenWhite from "../../assets/queen_white.png";
import rookBlack from "../../assets/rook_black.png";
import rookWhite from "../../assets/rook_white.png";
import { Position } from "../interfaces/position";
import { Piece } from "../pieces/piece";

export const pieceMap = {
  k: kingBlack,
  K: kingWhite,
  b: bishopBlack,
  B: bishopWhite,
  n: knightBlack,
  N: knightWhite,
  p: pawnBlack,
  P: pawnWhite,
  q: queenBlack,
  Q: queenWhite,
  r: rookBlack,
  R: rookWhite
};

export class ChessBoard {
  board: (Piece | null)[][];
  constructor() {
    this.board = this.createChessBoard(8);
  }

  private createChessBoard(sideLength: number): (Piece | null)[][] {
    const board = [];
    for (let i = 0; i < sideLength; i++) {
      board[i] = [] as (Piece | null)[];
      for (let j = 0; j < sideLength; j++) {
        board[i].push(null);
      }
    }
    return board;
  }

  getBoard(): (Piece | null)[][] {
    return this.board;
  }

  hasPiece(position: Position): boolean {
    return this.board[position.x][position.y] !== null;
  }

  getSquare(position: Position): Piece | null {
    return this.board[position.x][position.y];
  }

  setSquare(position: Position, piece: Piece) {
    this.board[position.x][position.y] = piece;
  }

  getPieces() {
    return this.board.flat().filter((value) => value !== null);
  }
}
