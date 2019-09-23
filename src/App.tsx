import React, { useReducer } from "react";
import "./styles/app.scss";
import Game from "./components/Game";
import { gameReducer, initialState, Context } from "./reducers/gameReducer";

function App() {
  const [store, dispatch] = useReducer(gameReducer, initialState);
  const value = { store, dispatch };
  return (
    <Context.Provider value={value}>
      <Game />
    </Context.Provider>
  );
}

export default App;
