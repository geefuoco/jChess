import { Position } from "../../interfaces/position";
import { Piece } from "../piece";
import { Move } from "../../moves/move";
import { ChessBoard } from "../../board/chessboard";

export class Pawn extends Piece {
  passable: boolean;
  direction: number;
  static MOVE_SET = [1, 0];
  static SPECIAL_MOVE = [2, 0];
  static CAPTURE_MOVES = [
    [1, 1],
    [1, -1]
  ];

  constructor(board: ChessBoard, color: string, position: Position) {
    super(board, color, position);
    this.passable = false;
    this.direction = this.color === "white" ? -1 : 1;
  }

  setPassable(bool: boolean) {
    this.passable = bool;
  }

  getPassable(): boolean {
    return this.passable;
  }

  move(move: Move) {
    super.move(move);
    if (move.isSpecial()) {
      this.passable = true;
    }
  }

  getMoveSet(): Move[] {
    let moves: Move[] = [];
    moves.push(this.generateMove(Pawn.MOVE_SET));
    if (!this.hasMoved) {
      moves.push(this.generateMove(Pawn.SPECIAL_MOVE, true));
    }
    moves = moves
      .concat(this.generateCaptureMoves())
      .filter((move) => move.validMove());
    return moves;
  }

  private generateMove(moveSet: number[], special = false): Move {
    const { x, y } = this.position;
    const rankOffset = x + moveSet[0] * this.direction;
    const fileOffset = y + moveSet[1] * this.direction;
    const move = new Move({ x: rankOffset, y: fileOffset }, special);
    return move;
  }

  private generateCaptureMoves(): Move[] {
    const moves: Move[] = [];
    Pawn.CAPTURE_MOVES.forEach((move) => {
      moves.push(this.generateMove(move));
    });
    return moves;
  }
}
