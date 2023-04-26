import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendNewExerciseService } from "../services";
import { NotificationManager } from "react-notifications";
import { useNavigate } from "react-router-dom";

export const NewExercise = ({ addExercise, categories }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    let idNewExercise;
    try {
      setSending(true);

      const data = new FormData(e.target);
      console.log("data", data);
      idNewExercise = await sendNewExerciseService({ data, token });

      e.target.reset();
      setImage(null);
    } catch {
      setError(error.message);
    } finally {
      setSending(false);
      NotificationManager.success(
        "Nuevo ejercicio guardado correctamente",
        "",
        6000
      );
      navigate(`/exercises/${idNewExercise}/details`);
    }
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <h1>Nuevo ejercicio</h1>
        <fieldset>
          <ul>
            <li>
              <label htmlFor="text">Nombre:</label>
              <input type="text" id="name" name="name" required />
            </li>

            <li>
              <label htmlFor="text">Categoría:</label>
              <select id="category" name="category" required>
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
            </li>
            <li>
              <label htmlFor="text">Descripción:</label>
              <textarea
                id="description"
                name="description"
                required
                cols="30"
                rows="10"
              />
            </li>
          </ul>
        </fieldset>
        <button>Añadir</button>
        {sending ? <p>Uploading exercise...</p> : null}
        {error ? <p className="msg-error">{error}</p> : null}
      </form>
    </>
  );
};
