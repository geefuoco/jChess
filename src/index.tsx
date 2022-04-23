import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { ChessBoard } from "./chess/board/chessboard";
import { Fen } from "./chess/fen/fen";

const chessBoard = new ChessBoard();
const fen = new Fen({
  pieces: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR",
  activeColor: "w",
  castling: "KQkq",
  enPassent: "-",
  halfMove: 0,
  fullMove: 1,
  board: chessBoard
});
fen.setBoardFromFen();

export const ChessBoardContext = React.createContext<ChessBoard>(chessBoard);

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
      <ChessBoardContext.Provider value={chessBoard}>
        <App />
      </ChessBoardContext.Provider>
    </DndProvider>
  </React.StrictMode>
);
