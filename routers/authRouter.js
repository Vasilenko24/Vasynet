import { Route, Routes } from "react-router-dom"
import LoginPage from "../../components/Auth/loginPage"
import RegisterPage from "../../components/Auth/registerPage"
import Profile from "../../components/Profile/profile"
import MainPage from "../../components/Main/mainPage"
import Users from "../../components/Users/users"


const AuthRouter = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<Users />} />
        </Routes>
    )
}

export default AuthRouter