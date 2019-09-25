import React, { useContext } from "react";
import { Context } from "../reducers/gameReducer";
import { startGame } from "../helpers/grid";
import "../styles/form.scss";

const Form = () => {
  const { store, dispatch } = useContext(Context);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch({ type: name, data: value });
  };

  const play = () => {
    const { bombs, size } = store;
    if (bombs <= size * size) {
      dispatch({ type: "UPDATE_GAME_READY" });
      dispatch(startGame(size, bombs));
    } else {
      dispatch({
        type: "UDPDATE_ERROR_MESSAGE",
        data: "The number of bombs is bigger than the number of cells."
      });
    }
  };

  return (
    <div className="Form">
      <h1>Welcome to Minesweeper</h1>
      <h2>Choose your game's parameters</h2>
      {store.errorMessage !== "" && (
        <div className="Form__error">{store.errorMessage}</div>
      )}
      <div className="Form__input">
        <span>Size of the grid</span>
        <input
          type="number"
          name="UPDATE_SIZE"
          value={store.size}
          onChange={handleChange}
        />
      </div>
      <div className="Form__input">
        <span>Number of bombs</span>
        <input
          type="number"
          name="UPDATE_BOMBS"
          value={store.bombs}
          onChange={handleChange}
        />
      </div>

      <button onClick={play}>Play</button>
    </div>
  );
};

export default Form;
