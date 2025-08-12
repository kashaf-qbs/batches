import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "../pages/Auth/Login";
import Home from "../pages/Home";

const PrivateRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ isLoggedIn, children }) => {
  return isLoggedIn ? <Navigate to="/" /> : children;
};

const AppRoutes = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute isLoggedIn={isLoggedIn}>
            <Login setIsLoggedIn={setIsLoggedIn} />
          </PublicRoute>
        }
      />
      <Route
        path="/"
        element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Home setIsLoggedIn={setIsLoggedIn} />
          </PrivateRoute>
        }
      />
    
      <Route
        path="*"
        element={
          isLoggedIn ? <Navigate to="/" /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

const AppNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    if (storedLogin === "true") {
      setIsLoggedIn(true);
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <BrowserRouter>
      <AppRoutes isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </BrowserRouter>
  );
};

export default AppNavigation;
