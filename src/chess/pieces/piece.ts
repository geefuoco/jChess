import { ChessBoard } from "../board/chessboard";
import { Position } from "../interfaces/position";
import { Move } from "../moves/move";
import { AbstractPieceMover } from "../moves/abstractPieceMover/abstractPieceMover";

export class Piece extends AbstractPieceMover {
  protected position: Position;
  protected hasMoved: boolean;
  protected legalMoves: Move[];

  constructor(board: ChessBoard, color: string, position: Position) {
    super(board, color);
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
}
