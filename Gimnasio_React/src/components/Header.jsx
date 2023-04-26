import { Link } from "react-router-dom";

import { Auth } from "./Auth";

export const Header = () => {
  return (
    <header>
      <h1>Gympp 🏋🏽‍♀️</h1>
      <nav>
        <Auth />
      </nav>
      <h2>
        <Link to="/"> Home </Link>
      </h2>
    </header>
  );
};
