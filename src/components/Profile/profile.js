import { memo, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDataQuery } from "../../services/authAPI";
import { setUser } from "../../feautures/auth/authSlice";

const Proifle = () => {
    // const dispatch = useDispatch();
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    console.log(user);

    // Если пользователь аутентифицирован, пропускаем запрос
    // const { data, error } = useGetUserDataQuery(undefined, {
    //     skip: isAuthenticated && user, // Пропускаем запрос, если пользователь уже в сторе
    // });

    // useEffect(() => {
    //     if (data && !user) {
    //         dispatch(setUser(data));
    //     }
    // }, [data, user, dispatch]);

    // if (!isAuthenticated) {
    //     return <div>Please log in</div>;
    // }

    return (
        <div>
            <h1>Welcome to your profile, {user?.username}</h1>
            {/* Здесь используем данные о пользователе */}
            <p>Email: {user?.email}</p>
        </div>
    );
};

export default memo(Proifle)