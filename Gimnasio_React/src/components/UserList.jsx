import { User } from "./User";

export const UserList = ({ users, removeUser }) => {
  return users.length ? (
    <section className="users">
      {users.map((user, index) => (
        <User key={index} user={user} removeUser={removeUser} />
      ))}
    </section>
  ) : (
    <p>No hay usuarios</p>
  );
};
