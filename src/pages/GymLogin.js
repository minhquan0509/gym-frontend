import { Link } from 'react-router-dom';
import '../css/GymLogin.css';
import background from '../images/img_login_signup.jpg';
import { createTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

function GymLogin() {
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Special Elite',
            ].join(','),
        },
    });
    return (
        <>
            <div className="login_page">
                <img src={background}></img>
                <div className='login_page-center'>
                    <div className='login_page-right'>
                        <h1 className='login_page-logo'>XingtuGym</h1>
                        <form >
                            <div className='login_page-title'>メール(Email)</div>
                            <input type="text" />
                            <div className='login_page-title'>パスワード(Mật khẩu)</div>
                            <input type="password" />
                            <div className='login_page-forgot'>
                                <Link to="">パスワードをお忘れの方はこちら</Link>
                            </div>
                            <Button variant="contained" color="success">ログイン</Button>
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