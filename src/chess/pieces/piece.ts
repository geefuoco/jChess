import { ChessBoard } from "../board/chessboard";
import { Position } from "../interfaces/position";
import { Move } from "../moves/move";
import { AbstractPieceMover } from "../moves/abstractPieceMover/abstractPieceMover";

export abstract class Piece extends AbstractPieceMover {
  protected position: Position;
  protected hasMoved: boolean;
  protected legalMoves: Move[];

  constructor(board: ChessBoard, color: string, position: Position) {
    super(board, color);
    this.position = position;
    this.hasMoved = false;
    this.legalMoves = [];
    board.subscribe(this);
  }

  move(move: Move) {
    this.position = move.getGoalPosition();
    this.hasMoved = true;
    this.updateLegalMoves();
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

  updateLegalMoves() {
    this.legalMoves = this.generateMoveSet();
  }

  generateMoveSet(): Move[] {
    const that = this; //eslint-disable-line
    type childPiece = {
      constructor: childPiece;
      MOVE_SET: number[][];
    } & typeof that;
    const moves: Move[] = [];
    (this as childPiece).constructor.MOVE_SET.forEach((moveSet) => {
      const newPosition = {
        x: moveSet[0] + this.position.x,
        y: moveSet[1] + this.position.y
      };
      if (!this.outsideOfBoard(newPosition)) {
        if (!this.hasFriendlyPiece(newPosition)) {
          moves.push(this.createMove(newPosition));
        }
      }
    });
    return moves;
  }

  canMove(position: Position): boolean {
    return (
      this.legalMoves
        .map((move) => JSON.stringify(move.getGoalPosition()))
        .find((v) => v === JSON.stringify(position)) !== undefined
    );
  }

  abstract getPieceCode(): string;
}
