import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthCheck } from "./hooks/useAuthCheck";
import Registration from "./pages/Registration";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <Login />
        </PublicRoute>
      ),
    },
    {
      path: "/registration",
      element: (
        <PublicRoute>
          <Registration />
        </PublicRoute>
      ),
    },
  ]);

  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking Authentication....</div>
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
