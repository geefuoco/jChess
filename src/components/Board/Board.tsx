import React from "react";
import "./Board.css";
import Cell from "../Cell/Cell";

const Board: React.FC = () => {
  const sideLength = 8;
  // Need to implement a virtual board
  //Virtual board can be set as state

  return <div data-testid="board" className="board"></div>;
};

export default Board;
