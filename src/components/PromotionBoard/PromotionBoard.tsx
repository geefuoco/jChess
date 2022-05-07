import React, { Dispatch, SetStateAction, useState } from "react";
import "./PromotionBoard.css";
import { ChessBoard, pieceMap } from "../../chess/board/chessboard";
import { useBoard } from "../ChessboardContext";
import { Piece } from "../../chess/pieces/piece";

interface Props {
  piece: Piece;
  color: string;
  setPromotablePiece: Dispatch<SetStateAction<Piece | null>>;
}

const PromotionBoard: React.FC<Props> = ({
  piece,
  color,
  setPromotablePiece
}) => {
  const chessBoard = useBoard().chessBoard as ChessBoard;
  const [show, setShow] = useState(true);
  const images =
    color === "white" ? ["Q", "R", "B", "N"] : ["q", "r", "b", "n"];

  return (
    <>
      {show && (
        <div className="promotion-board">
          <button
            type="button"
            className="piece-button"
            onClick={() => {
              chessBoard.promote(piece, images[0]);
              setShow(false);
              setPromotablePiece(null);
            }}
          >
            <img src={pieceMap[images[0]]} alt="queen" />
          </button>
          <button
            type="button"
            className="piece-button"
            onClick={() => {
              chessBoard.promote(piece, images[1]);
              setShow(false);
              setPromotablePiece(null);
            }}
          >
            <img src={pieceMap[images[1]]} alt="rook" />
          </button>
          <button
            type="button"
            className="piece-button"
            onClick={() => {
              chessBoard.promote(piece, images[2]);
              setShow(false);
              setPromotablePiece(null);
            }}
          >
            <img src={pieceMap[images[2]]} alt="bishop" />
          </button>
          <button
            type="button"
            className="piece-button"
            onClick={() => {
              chessBoard.promote(piece, images[3]);
              setShow(false);
              setPromotablePiece(null);
            }}
          >
            <img src={pieceMap[images[3]]} alt="knight" />
          </button>
        </div>
      )}
    </>
  );
};

export default PromotionBoard;
