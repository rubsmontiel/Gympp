import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { confirmAlert } from "react-confirm-alert";
import {
  deleteExerciseService,
  deleteLikeExerciseService,
  likeExerciseService,
} from "../services";
import { NotificationManager } from "react-notifications";
import { confirmAlert } from "react-confirm-alert";

export const Exercise = ({ exercise, removeExercise, updateLikeExercise }) => {
  const { user, token } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // función para borrar un ejercicio
  const deleteExercise = async (id) => {
    try {
      await deleteExerciseService({ id, token });
      NotificationManager.success(
        "Ejercicio eliminado correctamente",
        "",
        6000
      );
      if (removeExercise) {
        removeExercise(id);
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // función para dar un like
  const likeExercise = async (id) => {
    try {
      await likeExerciseService({ id, token });
      if (updateLikeExercise) {
        updateLikeExercise(id, true);
      } else {
        navigate("/");
      }
    } catch (error) {
      NotificationManager.error(error.message, "", 6000);
      //setError(error.message);
    }
  };

  // función para eliminar un like
  const deleteLikeExercise = async (id) => {
    try {
      await deleteLikeExerciseService({ id, token });
      if (updateLikeExercise) {
        updateLikeExercise(id, false);
      } else {
        navigate("/");
      }
    } catch (error) {
      NotificationManager.error(error.message, "", 6000);
    }
  };

  return (
    <article>
      <section className="img-description">
        {exercise.img ? (
          <img
            alt="Imagen del ejercicio"
            src={`${process.env.REACT_APP_BACKEND}/uploads/${exercise.img}`}
          ></img>
        ) : null}

        <h2>
          <Link to={`/exercises/${exercise.id}/details`}>{exercise.name}</Link>
        </h2>
        <p className="category">
          <span>{exercise.category}</span>
        </p>
        <p className="description">{exercise.description}</p>
        <p className="likes">🔥 {exercise.likes} likes</p>
      </section>

      {user !== null && user.admin === 1 ? (
        <section className="section-buttons">
          <ul className="btn-exercise">
            <li>
              <Link to={`/exercises/${exercise.id}/edit`} state={exercise}>
                <button
                  className="edit-button"
                  title="Editar ejercicio"
                ></button>
              </Link>
            </li>
            <li>
              <button
                title="Eliminar ejercicio"
                className="delete-button"
                onClick={() => {
                  confirmAlert({
                    title: "Borrar ejercicio",
                    message: `¿Estás seguro que desea borrar el ejercicio ${exercise.name}?`,
                    buttons: [
                      {
                        label: "Aceptar",
                        onClick: () => deleteExercise(exercise.id),
                      },
                      {
                        label: "Cancelar",
                      },
                    ],
                  });
                }}
              ></button>
            </li>
          </ul>
        </section>
      ) : null}

      {user && user.admin !== 1 ? (
        <section className="section-buttons">
          <ul className="btn-exercise">
            <li>
              {exercise.userLikes === 0 ? (
                <button
                  title="Like"
                  className="like-button"
                  onClick={() => {
                    likeExercise(exercise.id);
                  }}
                ></button>
              ) : (
                <button
                  title="noLike"
                  className="nolike-button"
                  onClick={() => {
                    deleteLikeExercise(exercise.id);
                  }}
                ></button>
              )}
            </li>
          </ul>
        </section>
      ) : null}

      {error ? <p className="msg-error">{error}</p> : null}
    </article>
  );
};
