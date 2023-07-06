import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/GymLogin.css';
import background from '../images/img_login_signup.jpg';
import { createTheme } from '@material-ui/core/styles';
import { Alert, Button } from '@mui/material';
import { loginRequest } from '../redux/actions/authActions';
import { getUser } from '../redux/selectors/authSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

function GymLogin() {
    const user = useSelector(state => state.auth.user);
    const error = useSelector(state => state.auth.error);
    const dispatch = useDispatch();



    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()


    const theme = createTheme({
        typography: {
            fontFamily: [
                'Special Elite',
            ].join(','),
        },
    });

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user]);

    const handleChangeUsername = (event) => {
        setUsername(event.target.value)
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    const handleLogin = () => {
        // const params = { username, password }
        dispatch(loginRequest({ username, password }))
    }

    return (
        <>
            <div className="login_page">
                <img src={background}></img>
                <div className='login_page-center'>
                    <div className='login_page-right'>
                        <h1 className='login_page-logo'>XingtuGym</h1>
                        <form >
                            <div className='login_page-title'>メール(Email)</div>
                            <input type="text" value={username} onChange={handleChangeUsername} />
                            <div className='login_page-title'>パスワード(Mật khẩu)</div>
                            <input type="password" value={password} onChange={handleChangePassword} />
                            {error && <Alert severity="error">Login failed</Alert>}
                            <div className='login_page-forgot'>
                                <Link to="">パスワードをお忘れの方はこちら</Link>
                            </div>
                            <Button variant="contained" color="success" onClick={handleLogin}>ログイン</Button>
                        </form>
                    </div>
                    <div className='login_page-tosignup'>
                        アカウントを持っていませんか？
                        <Link to={`/sign_up`} style={{ textDecoration: 'none' }}> サインアップ</Link>
                    </div>
                </div>


            </div >
        </>
    )
}

export default GymLogin;