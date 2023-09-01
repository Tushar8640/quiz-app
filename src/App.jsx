import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import { useAuthCheck } from "./hooks/useAuthCheck";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import AddLessonPage from "./pages/AddLessonPage";
import AddQuixPage from "./pages/AddQuixPage";
import LessonsPage from "./pages/LessonsPage";
import SIngleLessonPage from "./pages/SIngleLessonPage";
import TakeQuizPage from "./pages/TakeQuizPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },

        {
          path: "/addlesson",
          element: <AddLessonPage />,
        },

        {
          path: "/addquiz",
          element: <AddQuixPage />,
        },
        {
          path: "/lessons",
          element: <LessonsPage />,
        },
        {
          path: "/lesson/:id",
          element: <SIngleLessonPage />,
        },
        {
          path: "/quiz/:id",
          element: <TakeQuizPage />,
        },
      ],
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
