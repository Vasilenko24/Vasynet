import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useLoginUserMutation } from "../../services/authAPI"
import { useDispatch } from "react-redux"
import { setUser } from "../../feautures/auth/authSlice";


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginUser, { isLoading, isError, isSuccess, error }] = useLoginUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const userData = await loginUser({ email, password }).unwrap();
            console.log('User Data:', userData); // Add this line
            // Adjust the following line based on the actual structure
            localStorage.setItem('accessToken', userData.accessToken || userData.token);
            dispatch(setUser(userData));
            navigate('/profile');  // Перенаправляем на защищенную страницу
        } catch (error) {
            console.log("Login failed:", error);
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginPage;