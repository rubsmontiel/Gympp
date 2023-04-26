import { Exercise } from "./Exercise";

export const ExercisesList = ({
  exercises,
  removeExercise,
  updateLikeExercise,
}) => {
  return exercises.length ? (
    <section className="exercises">
      {exercises.map((exercise, index) => (
        <Exercise
          key={index}
          exercise={exercise}
          removeExercise={removeExercise}
          updateLikeExercise={updateLikeExercise}
        />
      ))}
    </section>
  ) : (
    <p>No hay ejercicios</p>
  );
};
