import { useContext, useState } from "react";
import { editUserService } from "../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { NotificationManager } from "react-notifications";

export const EditUser = ({ id }) => {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { user, token } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    email: user.email,
    name: user.name,
  });
  const navigate = useNavigate();

  //actualizamos los valores del formulario
  const handleChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //guarda los valores del formulario una vez modificado
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      const data = new FormData(e.target);
      const [email, name] = data.values();
      await editUserService({
        id,
        email,
        name,
        token,
      });
    } catch {
      setError(error.message);
    } finally {
      setSending(false);
      NotificationManager.success("Usuario editado correctamente", "", 6000);
      navigate(`/user/${id}`);
    }
  };
  return (
    <form onSubmit={handleForm}>
      <h1>Editar usuario</h1>
      <fieldset>
        <ul>
          <li>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userInfo.email}
              required
              onChange={handleChange}
            />
          </li>
        </ul>
        <ul>
          <li>
            <label htmlFor="text">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userInfo.name}
              required
              onChange={handleChange}
            />
          </li>
        </ul>
      </fieldset>
      <button>Guardar</button>
      {sending ? <p>Editando usuario...</p> : null}
      {error ? <p className="msg-error">{error}</p> : null}
    </form>
  );
};
