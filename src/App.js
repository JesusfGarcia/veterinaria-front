import React from "react";
import Dashboard from "./components/dashboard";
import Login from "./views/login";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./sass/global.scss";
import Redirect from "./components/Redirect";
import apiConsumer from "./services";
import Loading from "./components/loading";

export const authContext = React.createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

function App() {
  const [user, setUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleLogin = (user) => {
    setUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("token");
    setUser(null)
  }

  const tryLogin = async () => {
    try {
      const { data } = await apiConsumer({
        url: "/login",
        data: {
          email: localStorage.getItem("email"),
          password: localStorage.getItem("password"),
        },
        method: "POST",
      });

      handleLogin(data.payload);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
    }
  };

  React.useEffect(() => {
    tryLogin();
  }, []);


  if(isLoading) {
    return <Loading />
  }

  return (
    <authContext.Provider value={{ user, handleLogin, handleLogout }}>
      <BrowserRouter>
        <Routes>
          {!user ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </>
          ) : (
            <>
              <Route path="/admin/*" element={<Dashboard />} />
              <Route path="/" element={<Navigate to="/admin/users" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </authContext.Provider>
  );
}

export default App;
