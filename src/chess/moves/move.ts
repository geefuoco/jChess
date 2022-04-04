import { Position } from "../interfaces/position";

export class Move {
  protected goalPosition: Position;
  protected special: boolean;
  constructor(goalPosition: Position, special = false) {
    this.goalPosition = goalPosition;
    this.special = special;
  }

  getGoalPosition(): Position {
    return this.goalPosition;
  }

  isSpecial(): boolean {
    return this.special;
  }

  validMove(): boolean {
    return (
      this.goalPosition.x >= 0 &&
      this.goalPosition.x <= 7 &&
      this.goalPosition.y >= 0 &&
      this.goalPosition.y <= 7
    );
  }
}
