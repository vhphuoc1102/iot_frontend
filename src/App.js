import { useRoutes } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import SignUp from "./components/SignUp";
import Root from "./routes/Root";
import ErrorPage from "./components/ErrorPage";
import Main from "./components/Main";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
import { Routes, Route, Link, Outlet } from "react-router-dom";
export default function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Root></Root>,
      errorElement: <ErrorPage />,
    },
    {
      path: "/signin",
      element: <SignInSide></SignInSide>,
    },
    {
      path: "/signup",
      element: <SignUp></SignUp>,
    },
    {
      path: "/main",
      element: (
        <ProtectedRoute>
          <Main></Main>
        </ProtectedRoute>
      ),
    },
  ]);
  return routes;
}
