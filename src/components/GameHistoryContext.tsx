import { useContext } from "react";
import React from "react";

interface IHistoryContext {
  history: string[] | null;
  setHistory: (newHistory: string[]) => void;
}

export const GameHistoryContext = React.createContext<IHistoryContext>({
  history: [],
  //eslint-disable-next-line
  setHistory: (newHistory: string[]) => {}
});

export const useGameHistory = () => useContext(GameHistoryContext);
