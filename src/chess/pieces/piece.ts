import { ChessBoard } from "../board/chessboard";
import { Position } from "../interfaces/position";
import { Move } from "../moves/move";

export class Piece {
  protected color: string;
  protected position: Position;
  protected hasMoved: boolean;
  protected legalMoves: Move[];
  protected board: ChessBoard;

  constructor(board: ChessBoard, color: string, position: Position) {
    this.board = board;
    this.color = color;
    this.position = position;
    this.hasMoved = false;
    this.legalMoves = [];
  }

  move(move: Move) {
    this.position = move.getGoalPosition();
    this.hasMoved = true;
  }

  getPosition(): Position {
    return this.position;
  }

  getHasMoved(): boolean {
    return this.hasMoved;
  }

  getLegalMoves(): Move[] {
    return this.legalMoves;
  }

  hasPiece(position: Position): boolean {
    return this.board.hasPiece(position);
  }
}
