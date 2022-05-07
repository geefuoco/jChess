import React from "react";

interface IMoveContext {
  moves: string[] | null;
  setMoves: (updatedMoves: string[]) => void;
}

export const MoveContext = React.createContext<IMoveContext>({
  moves: [],
  //eslint-disable-next-line
  setMoves: (updatedMoves: string[]) => {}
});
