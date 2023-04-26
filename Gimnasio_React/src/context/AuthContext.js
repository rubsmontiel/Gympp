import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services";
export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  //guardamos el token en el localStorage
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  //vemos si el token es válido y sino lo deslogueo
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyUserDataService({ token });
        setUser(data);
      } catch (error) {
        logout();
      }
    };
    if (token) getUserData();
  }, [token, setToken]);

  //función para loguearse
  const login = (token) => {
    setToken(token);
  };

  //función para desloguearse
  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
