import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllUsersQuery } from "../../services/authAPI";
import { setLoading, setUsers } from "../../feautures/getUsers/getUsersSlice";


const Users = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const { data: usersList, isLoading } = useGetAllUsersQuery();
    const { users } = useSelector((state) => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isAuthenticated) {
            dispatch(setLoading(!isLoading))
        }

        if (usersList && !users.length) {
            dispatch(setUsers(Array.isArray(usersList) ? usersList : []));
        }
    }, [usersList, users, dispatch]);

    if (!isAuthenticated) {
        return <div>must be logged...</div>; // Если пользователь не аутентифицирован или есть ошибка
    }
    if (!isLoading && !isAuthenticated) {
        return <div>Loading...</div>; // Пока идет проверка или загрузка данных
    }



    return (
        <div>
            {users.map(user => (
                <div key={user.id}>
                    <div>Email: {user.email}</div>
                    <div>Username: {user.username}</div>
                </div>
            ))}
        </div>
    );
};

export default memo(Users);