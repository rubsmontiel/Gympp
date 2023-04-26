import { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryExercise } from "../components/CategoryExercise";
import { ErrorMessage } from "../components/ErrorMessage";
import { ExercisesList } from "../components/ExercisesList";
import { useCategories } from "../const/categories";
import { AuthContext } from "../context/AuthContext";
import { useExercises } from "../hooks/useExercises";

export const HomePage = () => {
  const {
    exercises,
    loading,
    error,
    removeExercise,
    setCategory,
    category,
    updateLikeExercise,
  } = useExercises("");
  const { categories } = useCategories();
  const { user } = useContext(AuthContext);

  if (error) return <ErrorMessage message={error} />;
  if (!user)
    return (
      <figure className="foto-portada">
        <img src="/culturista.png" alt="foto culturista" />
      </figure>
    );
  return (
    <section>
      {user !== null && user.admin === 1 ? (
        <section>
          <Link to={"/exercises"}>
            <button className="custom-button">Nuevo ejercicio</button>
          </Link>
          <Link to={"/users"}>
            <button className="users-button custom-button">
              Listado de usuarios
            </button>
          </Link>
        </section>
      ) : null}
      <CategoryExercise
        setCategory={setCategory}
        category={category}
        categories={categories}
      />
      <h1>Lista de Ejercicios</h1>
      {loading ? (
        <p>Cargando</p>
      ) : (
        <ExercisesList
          exercises={exercises}
          removeExercise={removeExercise}
          updateLikeExercise={updateLikeExercise}
        />
      )}
    </section>
  );
};
