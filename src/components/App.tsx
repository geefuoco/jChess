import React from "react";
import Board from "./Board/Board";

const App: React.FC = () => {
  return (
    <div className="app">
      <h1>jChess</h1>
      <Board />
    </div>
  );
};

export default App;
