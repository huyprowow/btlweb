import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./page/Login/LoginPage";
import SignUpPage from "./page/SignUp/SignUpPage";
import HomePage from "./page/Home/HomePage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AdminPage from "./page/Admin/AdminPage";

const useAuth = () => localStorage.getItem("token");
function PrivateRoute({ children }) {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});


const App = () => {
  return (
    // <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/dashboard" element={Dashboard} />

          {/* <PrivateRoute
          path="/private"
          element={
            <PrivateRoute>
              <Private />
            </PrivateRoute>
          }
        /> */}
        </Routes>
      </BrowserRouter>
    // </ThemeProvider>
  );
};

export default App;
