import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  useDrag,
  useDrop,
  DragPreviewImage,
  DropTargetMonitor
} from "react-dnd";
import { ChessBoardContext } from "../ChessboardContext";
import { Position } from "../../chess/interfaces/position";
import { Piece } from "../../chess/pieces/piece";
import "./Cell.css";
import { ChessBoard } from "../../chess/board/chessboard";

interface PieceObject {
  piece: Piece;
  image: string;
}

interface Props {
  piece?: PieceObject;
  light: boolean;
  position: Position;
  setBoard: Dispatch<SetStateAction<(Piece | null)[][]>>;
  setPromotablePiece: Dispatch<SetStateAction<Piece | null>>;
  gameover: boolean;
}

const Cell: React.FC<Props> = ({
  piece,
  light,
  position,
  setBoard,
  setPromotablePiece,
  gameover
}) => {
  const chessBoard = useContext(ChessBoardContext).chessBoard as ChessBoard;
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: "piece",
      item: piece,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    }),
    [piece, position]
  );

  const handlePieceMove = (piece: Piece, position: Position) => {
    if (piece.getColor() === piece.board.getCurrentPlayer()) {
      try {
        chessBoard.move(piece, position);
        if (
          piece.constructor.name === "Pawn" &&
          (piece.getPosition().x === 0 || piece.getPosition().x === 7)
        ) {
          setPromotablePiece(piece);
        }
        setBoard([...chessBoard.getBoard()]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const canPieceMove = (piece: Piece, position: Position): boolean => {
    if (piece.getColor() === piece.board.getCurrentPlayer()) {
      if (piece.canMove(position)) {
        return true;
      }
    }
    return false;
  };

  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "piece",
      drop: (item: PieceObject) => {
        const { piece } = item;

        handlePieceMove(piece, position);
      },
      canDrop: (item: PieceObject) => {
        const { piece } = item;
        return canPieceMove(piece, position);
      },
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
      })
    }),
    [piece, position]
  );

  const dropStyles =
    !isOver && canDrop
      ? {
          border: "solid 6px #E9E887"
        }
      : undefined;

  return (
    <>
      <DragPreviewImage src={piece?.image || ""} connect={dragPreview} />
      <div
        className={`cell ${light ? "light" : "dark"}`}
        data-testid="cell"
        ref={drop}
        onDrag={(e) => e.preventDefault()}
        style={dropStyles}
      >
        {piece && (
          <img
            ref={!gameover ? drag : null}
            src={piece.image}
            alt={piece.piece.getPieceCode()}
            className="piece"
            style={{
              opacity: isDragging ? 0 : 1,
              transform: "translate(0, 0)"
            }}
          />
        )}
      </div>
    </>
  );
};

export default Cell;
