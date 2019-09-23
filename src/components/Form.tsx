import React, { useContext } from "react";
import { Context } from "../reducers/gameReducer";
import { buildGrid } from "./Grid";

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
      dispatch({ type: "changeGameReady" });
      dispatch(startGame());
    } else {
      dispatch({
        type: "changeErrorMessage",
        data: "Le nombre de bombes est supérieur au nombre de cases."
      });
    }
  };

  const startGame = () => {
    var cells = buildGrid(store.size, store.bombs);
    return {
      type: "buildGrid",
      data: cells
    };
  };

  return (
    <div className="Form">
      <h1>Bienvenue sur le démineur</h1>
      <h2>Choisissez vos paramètres de jeux.</h2>
      {store.errorMessage !== "" && (
        <div className="Form__error">{store.errorMessage}</div>
      )}
      <div className="Form__input">
        <span>Taille de la grille</span>
        <input
          type="number"
          name="changeSize"
          value={store.size}
          onChange={handleChange}
        />
      </div>
      <div className="Form__input">
        <span>Nombre de bombes</span>
        <input
          type="number"
          name="changeBombs"
          value={store.bombs}
          onChange={handleChange}
        />
      </div>

      <button onClick={play}>Play</button>
    </div>
  );
};

export default Form;
