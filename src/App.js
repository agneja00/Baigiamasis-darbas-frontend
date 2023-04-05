import './App.css';
import { Route, Routes } from "react-router-dom";
import { useState } from 'react';
import routes from './constants/routes';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import Cookies from 'js-cookie';

const defaultToken = Cookies.get("_user_token");

function App() {
  const [token, setToken] = useState(defaultToken)
  console.log(token);
  return (
    <Layout>
      <Routes>
         <Route path={routes.loginPage} element={<LoginPage onLogin={(token) => {
          Cookies.set("_user_token", token);
          setToken(token);
        }}/>} />
         <Route path={routes.homePage} element={<HomePage token={token}/>} />
        <Route path={routes.registerPage} element={<RegisterPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
