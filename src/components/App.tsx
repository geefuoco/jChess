import React, { useState } from "react";
import Board from "./Board/Board";
import { ChessBoardContext } from "./ChessboardContext";
import { MoveContext } from "./MoveContext";
import { Fen } from "../chess/fen/fen";
import { ChessBoard } from "../chess/board/chessboard";
import Moves from "./Moves/Moves";

const chessBoard = new ChessBoard();
const fen = new Fen({
  pieces: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  activeColor: "w",
  castling: "KQkq",
  enPassent: "-",
  halfMove: 0,
  fullMove: 1
});
Fen.setBoardFromFen(chessBoard, fen);

const App: React.FC = () => {
  const [board, setBoard] = useState(chessBoard);
  const setChessBoard = (board: ChessBoard) => {
    setBoard(board);
  };
  const [moveList, setMoveList] = useState<string[] | null>(null);
  const updateMoveList = (moveList: string[]) => {
    setMoveList(moveList);
  };

  return (
    <ChessBoardContext.Provider value={{ chessBoard: board, setChessBoard }}>
      <MoveContext.Provider
        value={{ moves: moveList, setMoves: updateMoveList }}
      >
        <div className="app">
          <div className="board-wrapper">
            <h1>jChess</h1>
            <Board />
          </div>
          <div className="moves-container-wrapper">
            <Moves />
          </div>
        </div>
      </MoveContext.Provider>
    </ChessBoardContext.Provider>
  );
};

export default App;
