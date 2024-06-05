import { createBrowserRouter } from "react-router-dom";
import SearchPage from "../pages/SearchPage/SearchPage";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import App from "../App";

export const router = createBrowserRouter([
    {
    path: "/",
    element: <App/>,
    children: [
        {path: "",element: <HomePage/>},
        {path: "search", element: <SearchPage/>},
        {path: "login", element: <LoginPage/>},
    ],
},
]);