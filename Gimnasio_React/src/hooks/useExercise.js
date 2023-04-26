import { useContext, useEffect, useState } from "react";
import { singleExerciseService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const useExercise = (id) => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const loadExercise = async () => {
      try {
        setLoading(true);
        const data = await singleExerciseService({ id, token });
        setExercise(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    loadExercise();
  }, [id, token]);

  const updateLikeExercise = (id, addLike) => {
    let exerciseUpdated = {
      ...exercise,
      likes: addLike ? exercise.likes + 1 : exercise.likes - 1,
      userLikes: addLike ? 1 : 0,
    };
    setExercise(exerciseUpdated);
  };

  return { exercise, loading, error, updateLikeExercise };
};
