import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./page/Login/LoginPage";
import SignUpPage from "./page/SignUp/SignUpPage";
import HomePage from "./page/Home/HomePage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AdminPage from "./page/Admin/AdminPage";

import NotFound from "./page/NotFound/NotFound";
import Success from "./page/Success/Success";
import ProfilePage from "./page/Profile/ProfilePage";

// import { createTheme } from '@mui/material/styles'
// import { ThemeProvider } from '@emotion/react';
const theme = createTheme({
  typography: {
    fontFamily: [
      'Quicksand',
      'Chilanka',
      'cursive',
    ].join(','),
  },
});
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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/success" element={<Success />} />
          <Route path="*" element={<NotFound />} />

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
    </ThemeProvider>
  );
};

export default App;
