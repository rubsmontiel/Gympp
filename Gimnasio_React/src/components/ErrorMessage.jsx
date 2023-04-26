import { Link } from "react-router-dom";

export const ErrorMessage = ({ message }) => {
  return (
    <>
      <p className="msg-error">{message}</p>
      <Link to="/">Go back to home page</Link>
    </>
  );
};
