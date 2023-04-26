import { NewExercise } from "../components/NewExercise";
import { useCategories } from "../const/categories";
export const NewExercisePage = () => {
  const { categories } = useCategories();
  return <NewExercise categories={categories} />;
};
