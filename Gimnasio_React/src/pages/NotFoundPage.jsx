import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <section>
      <h1>ruta no encontrada</h1>
      <Link to="/">Go back to home page</Link>
    </section>
  );
};
