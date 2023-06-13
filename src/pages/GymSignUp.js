import { Link } from 'react-router-dom';
import '../css/GymLogin.css';
import '../css/GymSignUp.css';
import background from '../images/img_login_signup.jpg';
import { createTheme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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
                    <div className='login_page-right signup_page-right'>
                        <h1 className='login_page-logo'>XingtuGym</h1>
                        <form >
                            <div className='login_page-title'>名前(Họ tên)</div>
                            <input type="text" />
                            <div className='login_page-title'>メール(Email)</div>
                            <input type="text" />
                            <div className='login_page-title'>パスワード(Mật khẩu)</div>
                            <input type="password" />
                            <div className='login_page-title'>パスワードを確認する(Nhập lại mật khẩu)</div>
                            <input type="password" />
                            <div className='login_page-title'>あなたは(Bạn là)</div>
                            <InputLabel id="signup_page-role">Role</InputLabel>
                            <Select
                                labelId="signup_page-role"
                                style={{ width: '50%', height: '40px' }}
                                label='Role'
                            >
                                <MenuItem value={0}>ユーザー(Người dùng)</MenuItem>
                                <MenuItem value={1}>ジムのオーナー(Chủ phòng gym)</MenuItem>
                            </Select>
                            <div style={{ width: '100%', textAlign: 'right' }}>
                                <Button variant="contained" color="success" className='btn-signup'>サインアップ</Button>
                            </div>
                            <div className='login_page-tosignup signup_page-tologin'>
                                アカウントを持っていますか？
                                <Link to={`/login`} style={{ textDecoration: 'none' }}> ログイン</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default GymLogin;