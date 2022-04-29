import React from "react";
import { ChessBoard } from "../chess/board/chessboard";

interface IChessBoardContext {
  chessBoard: ChessBoard | null;
  setChessBoard: (chessBoard: ChessBoard) => void;
}

export const ChessBoardContext = React.createContext<IChessBoardContext>({
  chessBoard: null,
  //eslint-disable-next-line
  setChessBoard: (chessBoard: ChessBoard) => {}
});
