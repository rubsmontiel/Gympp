import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ExercisePage } from "./pages/ExercisePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { NewExercisePage } from "./pages/NewExercisePage";
import { EditExercisePage } from "./pages/EditExercisePage";
import { UserPage } from "./pages/UserPage";
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { EditUserPage } from "./pages/EditUserPage";
import "react-confirm-alert/src/react-confirm-alert.css";
import { UserListPage } from "./pages/UserListPage";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/exercises/:id/details" element={<ExercisePage />} />
          <Route path="/exercises" element={<NewExercisePage />} />
          <Route path="/exercises/:id/edit" element={<EditExercisePage />} />
          <Route path="/user/:id" element={<UserPage />} />
          <Route path="/user/:id/edit" element={<EditUserPage />} />
          <Route path="/users" element={<UserListPage />} />
          {/*en caso de no encontrar alguna de las rutas anteriores nos avisa del error*/}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <NotificationContainer />
        <link
          rel="stylesheet"
          type="text/css"
          href="path/to/notifications.css"
        ></link>
      </main>
      <Footer />
    </>
  );
}

export default App;
