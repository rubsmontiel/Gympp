import { useContext, useEffect, useState } from "react";
import { getAllUsersService } from "../services";
import { AuthContext } from "../context/AuthContext";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        const data = await getAllUsersService({ token });
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, [token]);

  //actualizamos el estado con los todos los usuarios con id diferente a la del usuario borrado
  const removeUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };
  return { users, loading, error, removeUser };
};
