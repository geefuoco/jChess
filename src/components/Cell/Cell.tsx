import React, { Dispatch, SetStateAction } from "react";
import {
  useDrag,
  useDrop,
  DragPreviewImage,
  DropTargetMonitor
} from "react-dnd";
import { useBoard } from "../ChessboardContext";
import { Position } from "../../chess/interfaces/position";
import { Piece } from "../../chess/pieces/piece";
import "./Cell.css";
import { ChessBoard } from "../../chess/board/chessboard";
import { useMoves } from "../MoveContext";

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
  const chessBoard = useBoard().chessBoard as ChessBoard;
  const updateMoveList = useMoves().setMoves;
  const moveList = useMoves().moves as string[];

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
        let moveNotation = getMoveNotation(piece, position);
        chessBoard.move(piece, position);
        if (
          piece.constructor.name === "Pawn" &&
          (piece.getPosition().x === 0 || piece.getPosition().x === 7)
        ) {
          setPromotablePiece(piece);
          moveNotation += `=`;
        }
        setBoard([...chessBoard.getBoard()]);

        updateMoveList([...(moveList ?? []), moveNotation]);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getMoveNotation = (piece: Piece, position: Position): string => {
    const captureMove = chessBoard.hasPiece(position);
    const coord = chessBoard.convertPositionToChessCoordinate(position);
    let moveNotation = "";
    if (piece.constructor.name != "Pawn") {
      moveNotation = `${piece.getPieceCode()}${coord}`;
      if (captureMove) {
        moveNotation = `${piece.getPieceCode()}x${coord}`;
      }
    } else {
      if (captureMove) {
        const pawnCoord = chessBoard
          .convertPositionToChessCoordinate(piece.getPosition())
          .charAt(0);
        moveNotation = `${pawnCoord}x${coord}`;
      } else {
        moveNotation = coord;
      }
    }

    return moveNotation;
  };

  const canPieceMove = (piece: Piece, position: Position): boolean => {
    if (piece.getColor() === piece.board.getCurrentPlayer()) {
      if (
        piece.canMove(position) &&
        !piece.board.moveEndangersKing(piece, position)
      ) {
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
