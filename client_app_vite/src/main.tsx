import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import SignUpPage from "./pages/SignUpPage";
import ProfilePage from "./pages/Profile/ProfilePage";
import NewTreatmentPage from "./pages/Treatment/NewTreatmentPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import EditTreatmentPage from "./pages/Treatment/EditTreatmentPage";
import NewPatientPage from "./pages/Patient/NewPatientPage.tsx";
import ViewPatientPage from "./pages/Patient/ViewPatientPage.tsx";
import ViewProfilePage from "./pages/Profile/ViewProfilePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "*", element: <HomePage /> },
      {
        path: "search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "userprofile/:userId",
        element: (
          <ProtectedRoute>
            <ViewProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "treatments/new",
        element: (
          <ProtectedRoute>
            <NewTreatmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "treatments/:id",
        element: (
          <ProtectedRoute>
            <h1>Show</h1>
          </ProtectedRoute>
        ),
      },
      {
        path: "treatments/:id/edit",
        element: (
          <ProtectedRoute>
            <EditTreatmentPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient/new",
        element: (
          <ProtectedRoute>
            <NewPatientPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient/:id",
        element: (
          <ProtectedRoute>
            <ViewPatientPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "patient/:id/edit",
        element: (
          <ProtectedRoute>
            <EditTreatmentPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
