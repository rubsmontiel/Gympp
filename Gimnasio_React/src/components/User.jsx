import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NotificationManager } from "react-notifications";
import { deleteUserService } from "../services";
import { confirmAlert } from "react-confirm-alert";

export const User = ({ user, removeUser }) => {
  const { token } = useContext(AuthContext);

  // función para borrar un ejercicio
  const deleteUser = async (id) => {
    try {
      await deleteUserService({ id, token });
      NotificationManager.success("Usuario eliminado correctamente", "", 6000);
      removeUser(id);
    } catch (error) {
      NotificationManager.error(
        "No se ha podido eliminar el usuario correctamente",
        error.message,
        6000
      );
    }
  };

  return (
    <section>
      <h2 className="Name">Nombre: {user.name}</h2>
      <p className="Email">Email: {user.email}</p>
      <p className="">
        Fecha de registro:{new Date(user.createdAt).toDateString()}
      </p>
      <button
        title="Eliminar usuario"
        className="delete-button"
        onClick={() => {
          confirmAlert({
            title: "Borrar usuario",
            message: `¿Estás seguro que desea borrar el usuario ${user.name}?`,
            buttons: [
              {
                label: "Aceptar",
                onClick: () => deleteUser(user.id),
              },
              {
                label: "Cancelar",
              },
            ],
          });
        }}
      ></button>
    </section>
  );
};
