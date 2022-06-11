import React from "react";
import { ChessBoard } from "../../chess/board/chessboard";
import { Fen } from "../../chess/fen/fen";
import { Piece } from "../../chess/pieces/piece";
import { useBoard } from "../ChessboardContext";
import { useGameHistory } from "../GameHistoryContext";
import { useMoves } from "../MoveContext";
import "./Moves.css";

const Moves: React.FC<{ setBoard: React.Dispatch<(Piece | null)[][]> }> = ({
  setBoard
}) => {
  const newBoard = new ChessBoard();
  const list = useMoves().moves as [];
  const setMoves = useMoves().setMoves;
  const gameHistory = useGameHistory().history as string[];
  const setHistory = useGameHistory().setHistory;
  const setChessBoard = useBoard().setChessBoard;

  const handleClick = (direction: "back" | "forward", pos: number) => {
    const newPos = direction == "back" ? pos - 1 : pos + 1;
    if (newPos >= 0 && newPos < gameHistory.length) {
      const fen = Fen.from(gameHistory[newPos]);
      if (fen) {
        Fen.setBoardFromFen(newBoard, fen as Fen);
        setChessBoard(newBoard);
        setBoard(newBoard.getBoard());
        setMoves(list.slice(0, list.length - 1));
        if (gameHistory.length > 1) {
          setHistory(gameHistory.slice(0, gameHistory.length - 1));
        }
      }
    }
  };

  return (
    <div className="moves-container">
      <header className="moves-header">
        <h2 className="moves-title">Moves</h2>
      </header>
      <main>
        <div className="move-list-container">
          {list &&
            list.map((value) => {
              return (
                <div className="move-text" key={value}>
                  {value}
                </div>
              );
            })}
        </div>
      </main>
      <footer className="moves-footer">
        <button onClick={() => handleClick("back", gameHistory.length - 1)}>
          &lt;
        </button>
      </footer>
    </div>
  );
};

export default Moves;
