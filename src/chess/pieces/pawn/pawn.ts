import { Position } from "../../interfaces/position";
import { Piece } from "../piece";
import { Move } from "../../moves/move";
import { ChessBoard } from "../../board/chessboard";
import { Capture } from "../../moves/capture";

export class Pawn extends Piece {
  passable: boolean;
  direction: number;
  static MOVE_SET = [
    [1, 0],
    [2, 0],
    [1, 1],
    [1, -1]
  ];

  constructor(board: ChessBoard, color: string, position: Position) {
    super(board, color, position);
    this.passable = false;
    this.direction = this.color === "white" ? -1 : 1;
    this.legalMoves = this.generateMoveSet();
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

  generateMoveSet(): Move[] {
    const moves: Move[] = [];
    const normalMoveset = Pawn.MOVE_SET[0];
    const specialMoveset = Pawn.MOVE_SET[1];
    const captureMoveset = Pawn.MOVE_SET.slice(2);

    let position = {
      x: this.position.x + normalMoveset[0] * this.direction,
      y: this.position.y + normalMoveset[1]
    };

    if (!this.outsideOfBoard(position) && !this.hasPiece(position)) {
      moves.push(this.createMove(position));
    }

    if (!this.hasMoved) {
      position = {
        x: this.position.x + specialMoveset[0] * this.direction,
        y: this.position.y + specialMoveset[1]
      };
      if (!this.hasPiece(position)) {
        moves.push(new Move(position, true));
      }
    }

    captureMoveset.forEach((moveset) => {
      position = {
        x: this.position.x + moveset[0] * this.direction,
        y: this.position.y + moveset[1]
      };
      if (!this.outsideOfBoard(position) && this.hasEnemyPiece(position)) {
        moves.push(this.createMove(position));
      }
    });

    this.captureEnPassent(moves);

    return moves;
  }

  captureEnPassent(moves: Move[]) {
    const positions = [
      {
        x: this.position.x,
        y: this.position.y - 1
      },
      {
        x: this.position.x,
        y: this.position.y + 1
      }
    ];

    positions.forEach((pos) => {
      if (!this.outsideOfBoard(pos) && this.hasEnemyPiece(pos)) {
        const pawn = this.board.getSquare(pos);
        if (pawn instanceof Pawn && pawn.getPassable()) {
          const capturePos = {
            x: pos.x + 1 * this.direction,
            y: pos.y
          };
          moves.push(new Capture(capturePos, pawn));
        }
      }
    });
  }

  getAttackSquares(): Position[] {
    const captureMoveSet = Pawn.MOVE_SET.slice(2);
    const positions: Position[] = [];
    captureMoveSet.forEach((moveSet) => {
      const pos = {
        x: this.position.x + moveSet[0] * this.direction,
        y: this.position.y + moveSet[1]
      };
      if (!this.outsideOfBoard(pos)) {
        positions.push(pos);
      }
    });
    return positions;
  }

  getPieceCode(): string {
    return this.color === "white" ? "P" : "p";
  }
}
