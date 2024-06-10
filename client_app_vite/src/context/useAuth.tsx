import { createContext, useEffect, useState } from "react";
import { UserProfile, UserProfileToken } from "../models/User";
import { useNavigate } from "react-router-dom";
import { loginApi, registerApi } from "../services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logoutUser: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => {
    await registerApi(firstName, lastName, email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            firstName: res?.data.firstName,
            lastName: res?.data.lastName,
            email: res?.data.email,
            role: res?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login successful");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginApi(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            firstName: res?.data.firstName,
            lastName: res?.data.lastName,
            email: res?.data.email,
            role: res?.data.role,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login successful");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occurred"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logoutUser = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logoutUser, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
