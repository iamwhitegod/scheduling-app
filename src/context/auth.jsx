import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";

const dbUsers = {
  users: [
    {
      id: 1,
      name: "Eminspire Ibhaze",
      email: "eminspire@gmail.com",
      password: "tesT123!@#",
    },
    {
      id: 2,
      name: "Whitegod Kingsley",
      email: "whitegod@gmail.com",
      password: "tesT123!@#",
    },
  ],
};

const init = JSON.parse(localStorage.getItem("state")) || {};

const initialState = {
  isAuthenticated: init?.isAuthenticated || false,
  user: init?.user || null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null,
      };
    default:
      throw new Error("Unhandled action type");
  }
};

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const navigate = useNavigate();

  const login = (user) => {
    dispatch({ type: "LOGIN_REQUEST" });

    setTimeout(() => {
      const authUser = dbUsers.users.find((u) => user.email === u.email);

      if (!authUser) {
        alert("User not found");
        dispatch({ type: "LOGIN_FAILURE" }); // Handle login failure
        return;
      }

      if (authUser.password !== user.password) {
        alert("Password or email is incorrect");
        dispatch({ type: "LOGIN_FAILURE" }); // Handle login failure
        return;
      }

      dispatch({ type: "LOGIN_SUCCESS", payload: authUser });
    }, 2000);
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
    navigate("/events");
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
