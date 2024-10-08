import { Link, Navigate, useNavigate } from "react-router-dom"
import styles from './header.module.css'
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../../feautures/auth/authSlice"
import { memo, useCallback } from 'react'
const Header = () => {

    const dispatch = useDispatch()
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    console.log(user);

    const handleLogout = useCallback(() => {
        dispatch(logout())
        navigate('/')
    }, [dispatch, navigate])
    return (

        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLogo}><Link to='/'>VasyNet</Link></div>
                <nav>
                    <ul>
                        <li><Link to='/users'>Users</Link></li>
                    </ul>
                </nav>
                <nav>
                    {isAuthenticated ? (
                        <ul className={styles.authLoc}>
                            <li >
                                <Link className={styles.profileBtn} to='/profile'>{user.username}</Link>
                            </li>
                            <li>
                                <button className={`${styles.logoutBtn}`} onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    ) : (
                        <ul className={styles.authLoc}>
                            <li ><Link className={`${styles.authBtn} ${styles.log}`} to='/login' >Sign in</Link></li>
                            <li ><Link className={`${styles.authBtn} ${styles.reg}`} to='/register' >Sign up</Link></li>
                        </ul>
                    )}
                </nav>
            </div>
        </div >
    )
}


export default memo(Header, (prevProps, nextProps) => {
    // Проверяем, изменились ли конкретные свойства пользователя и статус аутентификации
    const isUserSame = prevProps.user?.id === nextProps.user?.id && prevProps.user?.username === nextProps.user?.username;
    return isUserSame && prevProps.isAuthenticated === nextProps.isAuthenticated;
});