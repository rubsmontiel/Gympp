import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError("");

    if (pass1 !== pass2) {
      setError("Las contraseñas no coinciden");
    }

    try {
      await registerUserService({ name, email, password: pass1 });
      //y hacemos que nos lleve a login
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section>
      <h1>Registrarse</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="pass1">Contraseña:</label>
          <input
            type="password"
            id="pass1"
            name="pass1"
            required
            onChange={(e) => setPass1(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="pass2">Repetir contraseña:</label>
          <input
            type="password"
            id="pass2"
            name="pass2"
            required
            onChange={(e) => setPass2(e.target.value)}
          ></input>
        </fieldset>
        {/*         <fieldset>
          <select name="admin">
            <option value="admin">Administrador</option>
            <option value="No admin">No administrador</option>
          </select>
        </fieldset> */}
        <button> Continuar </button>
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  );
};
