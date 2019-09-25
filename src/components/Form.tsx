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
        data: "Le nombre de bombes est supérieur au nombre de cases."
      });
    }
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
          name="UPDATE_SIZE"
          value={store.size}
          onChange={handleChange}
        />
      </div>
      <div className="Form__input">
        <span>Nombre de bombes</span>
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
