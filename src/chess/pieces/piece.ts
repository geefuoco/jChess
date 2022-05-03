import { ChessBoard, Color } from "../board/chessboard";
import { Position } from "../interfaces/position";
import { Move } from "../moves/move";
import { AbstractPieceMover } from "../moves/abstractPieceMover/abstractPieceMover";

export abstract class Piece extends AbstractPieceMover {
  protected position: Position;
  protected hasMoved: boolean;
  protected legalMoves: Move[];
  protected moveMap: { [key: string]: boolean };

  constructor(board: ChessBoard, color: Color, position: Position) {
    super(board, color);
    this.position = position;
    this.hasMoved = false;
    this.legalMoves = [];
    this.moveMap = {};
    board.subscribe(this);
  }

  move(move: Move) {
    this.position = move.getGoalPosition();
    this.hasMoved = true;
  }

  getPosition(): Position {
    return this.position;
  }

  setPosition(position: Position) {
    this.position = position;
  }

  getHasMoved(): boolean {
    return this.hasMoved;
  }

  getLegalMoves(): Move[] {
    return this.legalMoves;
  }

  updateLegalMoves() {
    this.legalMoves = this.generateMoveSet();
    this.moveMap = this.getMoveMap();
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
      if (this.validTargetSquare(newPosition)) {
        const move = this.createMove(newPosition);
        moves.push(move);
      }
    });
    return moves;
  }

  canMove(position: Position): boolean {
    return JSON.stringify(position) in this.moveMap;
  }

  getAttackSquares(): Position[] {
    return this.legalMoves.map((move) => move.getGoalPosition());
  }

  getMoveMap(): { [key: string]: boolean } {
    const map: { [key: string]: boolean } = {};
    for (const pos of this.legalMoves.map((m) => m.getGoalPosition())) {
      if (!(JSON.stringify(pos) in map)) {
        map[JSON.stringify(pos)] = true;
      }
    }
    return map;
  }

  validTargetSquare(position: Position): boolean {
    return !this.outsideOfBoard(position) && !this.hasFriendlyPiece(position);
  }

  abstract getPieceCode(): string;
}
