import { ChessBoard, Color } from "../../board/chessboard";
import { Position } from "../../interfaces/position";
import { Piece } from "../../pieces/piece";
import { Capture } from "../capture";
import { Move } from "../move";

export abstract class AbstractPieceMover {
  board: ChessBoard;
  color: Color;
  constructor(board: ChessBoard, color: Color) {
    this.board = board;
    this.color = color;
  }

  createMove(newPosition: Position): Move {
    if (this.hasEnemyPiece(newPosition)) {
      const piece = this.board.getSquare(newPosition);
      return this.createCaptureMove(newPosition, piece as Piece);
    } else {
      return this.createNormalMove(newPosition);
    }
  }

  private createCaptureMove(newPosition: Position, piece: Piece): Move {
    return new Capture(newPosition, piece);
  }

  private createNormalMove(newPosition: Position): Move {
    return new Move(newPosition);
  }

  getColor(): Color {
    return this.color;
  }

  hasPiece(position: Position): boolean {
    return this.board.hasPiece(position);
  }

  hasFriendlyPiece(position: Position): boolean {
    return this.hasPiece(position) && !this.hasEnemyPiece(position);
  }

  hasEnemyPiece(position: Position): boolean {
    const piece = this.board.getSquare(position);
    if (piece) {
      return piece.getColor() !== this.color;
    }
    return false;
  }

  outsideOfBoard(position: Position): boolean {
    return position.x < 0 || position.x > 7 || position.y < 0 || position.y > 7;
  }
}
