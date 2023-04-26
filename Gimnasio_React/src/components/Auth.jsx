import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const Auth = () => {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <p>
      🙃
      <Link to={`/user/${user.id}`}>{user.name}</Link>
      <NavLink className="custom-button" to={"/"} onClick={() => logout()}>
        Cerrar sesión
      </NavLink>
    </p>
  ) : (
    <ul>
      <li>
        <Link to="/login">Iniciar sesión</Link>
      </li>
      <li>
        <Link to="/register">Registrarse</Link>
      </li>
    </ul>
  );
};
