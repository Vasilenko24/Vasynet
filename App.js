import { BrowserRouter as Router } from "react-router-dom";
import store from './store'
import AuthRouter from "./routers/authRouter";
import Header from "../components/Header/Header";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { useGetUserDataQuery } from "../services/authAPI";
import { setUser } from "../feautures/auth/authSlice";
import React from "react";


const App = React.memo(() => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('accessToken');

  // Используем getUserDataQuery только если есть токен
  const { data: user, error, isLoading } = useGetUserDataQuery(undefined, {
    skip: !token, // Если токена нет, запрос не отправляется
  });

  useEffect(() => {
    let isMounted = true; // флаг для контроля "монтирования"

    if (user && isMounted) {

      dispatch(setUser(user));
    }
    if (error) {
      console.log("Ошибка авторизации: ", error);
    }

    return () => {
      isMounted = false; // При размонтировании компонента флаг станет false
    };
  }, [dispatch, user, error]);

  const routes = useMemo(() => (
    <Router>
      <Header />
      <AuthRouter />
    </Router>
  ), [user]); // Добавляем зависимости, если есть

  return routes;
})

export default App;
