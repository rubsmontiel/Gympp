import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserList } from "../components/UserList";
import { useUsers } from "../hooks/useUsers";

export const UserListPage = () => {
  const { user } = useContext(AuthContext);
  const { users, removeUser } = useUsers("");

  return (
    <>
      {user !== null && user.admin === 1 ? (
        <UserList users={users} removeUser={removeUser} />
      ) : null}
    </>
  );
};
