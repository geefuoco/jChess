import { ChessBoard, Color } from "../../board/chessboard";
import { Position } from "../../interfaces/position";
import { Castle } from "../../moves/castle";
import { Move } from "../../moves/move";
import { Piece } from "../piece";
import { Rook } from "../rook/rook";

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

  constructor(board: ChessBoard, color: Color, position: Position) {
    super(board, color, position);
    this.inCheck = false;
    this.legalMoves = this.generateMoveSet();
    this.moveMap = this.getMoveMap();
  }

  generateMoveSet(): Move[] {
    const moves = super.generateMoveSet();
    this.generateCastleMoves(moves);
    const invalidPositions = this.board.getAttackedSquares(this.color);
    return moves.filter((move) => {
      const pos = move.getGoalPosition();
      return !(JSON.stringify(pos) in invalidPositions);
    });
  }

  getAttackSquares(): Position[] {
    return super.generateMoveSet().map((mov) => mov.getGoalPosition());
  }

  generateCastleMoves(moves: Move[]) {
    const kingXPos = this.position.x;
    const [k1, k2] = [
      { x: kingXPos, y: this.position.y + 1 },
      { x: kingXPos, y: this.position.y + 2 }
    ];
    const [q1, q2, q3] = [
      { x: kingXPos, y: this.position.y - 1 },
      { x: kingXPos, y: this.position.y - 2 },
      { x: kingXPos, y: this.position.y - 3 }
    ];
    const [queenRook, kingRook] = [
      this.board.getSquare({ x: kingXPos, y: 0 }),
      this.board.getSquare({ x: kingXPos, y: 7 })
    ];

    if (
      queenRook?.canMove(q1) &&
      queenRook.canMove(q2) &&
      queenRook.canMove(q3)
    ) {
      if (this.canCastle(queenRook))
        moves.push(new Castle(q2, queenRook as Rook, q1));
    }

    if (kingRook?.canMove(k1) && kingRook.canMove(k2)) {
      if (this.canCastle(kingRook)) {
        moves.push(new Castle(k2, kingRook as Rook, k1));
      }
    }
  }

  setChecked(bool: boolean) {
    this.inCheck = bool;
  }

  isChecked(): boolean {
    return this.inCheck;
  }

  canCastle(rook: Piece): boolean {
    if (rook.constructor.name !== "Rook") {
      return false;
    }
    return !this.inCheck && !this.hasMoved && !rook.getHasMoved();
  }
  getPieceCode(): string {
    return this.color === "white" ? "K" : "k";
  }
}
