import Select from "react-select";
export const CategoryExercise = ({ setCategory, category, categories }) => {
  const handleChange = async (selectedOption) => {
    let value = selectedOption ? selectedOption.value : "";
    setCategory(value);
  };

  return (
    <section className="category-filter">
      <Select
        isClearable
        options={categories}
        placeholder="Escoge categoría..."
        onChange={handleChange}
        autoFocus={true}
      />
    </section>
  );
};
