import { ChessBoard } from "../board/chessboard";
import { Position } from "../interfaces/position";
import { Move } from "../moves/move";
import { Piece } from "./piece";

export abstract class SlidingPiece extends Piece {
  constructor(board: ChessBoard, color: string, position: Position) {
    super(board, color, position);
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
      this.getSlidingMoves(newPosition, moveSet, moves);
    });
    return moves;
  }

  private getSlidingMoves(
    newPosition: Position,
    moveSet: number[],
    moves: Move[]
  ) {
    while (!this.outsideOfBoard(newPosition)) {
      if (this.hasEnemyPiece(newPosition)) {
        moves.push(this.createMove(newPosition));
        break;
      } else if (!this.hasPiece(newPosition)) {
        moves.push(this.createMove(newPosition));
        const rankOffset = moveSet[0] + newPosition.x;
        const fileOffset = moveSet[1] + newPosition.y;
        newPosition = { x: rankOffset, y: fileOffset };
      } else {
        break;
      }
    }
  }
}
