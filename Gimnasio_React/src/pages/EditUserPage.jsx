import { useParams } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { ErrorMessage } from "../components/ErrorMessage";
import { EditUser } from "../components/EditUser";

export const EditUserPage = () => {
  const { id } = useParams();
  const { loading, error } = useUser(id);

  if (loading) return <p>Cargando usuario...</p>;
  if (error) return <ErrorMessage message={error} />;

  return <EditUser id={id} />;
};
