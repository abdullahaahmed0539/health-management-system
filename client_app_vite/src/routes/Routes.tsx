import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import App from "../App";
import ProtectedRoute from "./ProtectedRoute";


export const router = createBrowserRouter([
    {
    path: "/",
    element: <App/>,
    children: [
        {path: "",element: <HomePage/>},
        {path: "search", element: <SearchPage/>},
        {path: "login", element: <LoginPage/>},
        {path: "profile", element: <ProtectedRoute><ProfilePage/></ProtectedRoute>},
    ],
},
]);