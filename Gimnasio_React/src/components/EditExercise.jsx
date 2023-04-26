import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { editExerciseService } from "../services";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export const EditExercise = ({ id, exercise, categories }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState();
  const { token } = useContext(AuthContext);
  const [exerciseInfo, setExerciseInfo] = useState({
    name: exercise.name,
    category: exercise.category,
    img: exercise.img,
    description: exercise.description,
  });
  const navigate = useNavigate();

  //actualizamos los valores del formulario
  const handleChange = (e) => {
    setExerciseInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //guarda los valores del formulario una vez modificado
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const data = new FormData(e.target);
      await editExerciseService({ id, data, token });
    } catch {
      setError(error.message);
    } finally {
      setSending(false);
      NotificationManager.success("Ejercicio editado correctamente", "", 6000);
      navigate(`/exercises/${id}/details`);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h1>Editar ejercicio</h1>
      <fieldset>
        <ul>
          <li>
            <label htmlFor="text">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={exerciseInfo.name}
              required
              onChange={handleChange}
            />
          </li>

          <li>
            <label htmlFor="text">Categoría:</label>
            <select
              id="category"
              name="category"
              value={exerciseInfo.category}
              onChange={handleChange}
              required
            >
              <option key="empty" value=""></option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="image">Imagen:</label>
            <input
              type="file"
              id="img"
              name="img"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
            {image ? (
              <figure>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  style={{ width: "100px" }}
                />
              </figure>
            ) : null}
            {exercise.img && !image ? (
              <img
                alt=""
                src={`${process.env.REACT_APP_BACKEND}/uploads/${exercise.img}`}
                style={{ width: "100px" }}
              ></img>
            ) : null}
          </li>
          <li>
            <label htmlFor="text">Descripción:</label>
            <textarea
              cols="30"
              rows="10"
              id="description"
              name="description"
              value={exerciseInfo.description}
              required
              onChange={handleChange}
            />
          </li>
        </ul>
      </fieldset>
      <button>Guardar</button>
      {sending ? <p>Uploading exercise...</p> : null}
      {error ? <p className="msg-error">{error}</p> : null}
    </form>
  );
};
