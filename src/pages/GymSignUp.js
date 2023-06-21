import { Link } from 'react-router-dom';
import '../css/GymLogin.css';
import '../css/GymSignUp.css';
import background from '../images/img_login_signup.jpg';
import { createTheme } from '@material-ui/core/styles';
import { Alert, Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import axios from 'axios';

function GymSignUp() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('')
    const [error, setError] = useState(null);
    const [noti, setNoti] = useState('')

    const theme = createTheme({
        typography: {
            fontFamily: [
                'Special Elite',
            ].join(','),
        },
    });

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value)
    }

    const handleChangeRole = (e) => {
        setRole(e.target.value)
    }

    const handleSignup = async () => {
        setError(null)
        setNoti(null);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.length == 0) {
            setError('Email is required');
            return
        } else if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return
        } else if (password.length < 6) {
            setError('Password must have at least 6 digits!');
            return
        } else if (password !== confirmPassword) {
            setError('Password do not match!');
            return
        } else if (role.length === 0) {
            setError('You have to pick role')
            return
        } else {
            await signUp({name, username: email, password, confirmPassword, role})
            return
        }
    }

    const signUp = async (params) => {
        try {
            await axios.post(`http://localhost:3001/users/signup`, params)
            setNoti('Signed up successfully')
        } catch (error) {
            const message = error.response.data.message
            setError(message)
        }
    };

    return (
        <>
            <div className="login_page">
                <img src={background}></img>
                <div className='login_page-center'>
                    <div className='login_page-right signup_page-right'>
                        <h1 className='login_page-logo'>XingtuGym</h1>
                        <form >
                            <TextField label="名前(Họ tên)" type="text" fullWidth margin="normal" onChange={handleChangeName}/>
                            <TextField label="メール(Email)" type="email" fullWidth margin="normal" onChange={handleChangeEmail} />
                            <TextField label="パスワード(Mật khẩu)" type="password" fullWidth margin="normal" onChange={handleChangePassword} />
                            <TextField label="パスワードを確認する(Nhập lại mật khẩu)" type="password" fullWidth margin="normal" onChange={handleChangeConfirmPassword} />
                            <div className='login_page-title'>あなたは(Bạn là)</div>
                            <InputLabel id="signup_page-role">Role</InputLabel>
                            <Select
                                labelId="signup_page-role"
                                style={{ width: '50%', height: '40px' }}
                                label='Role'
                                onChange={handleChangeRole}
                            >
                                <MenuItem value={'user'}>ユーザー(Người dùng)</MenuItem>
                                <MenuItem value={'gym-owner'}>ジムのオーナー(Chủ phòng gym)</MenuItem>
                            </Select>
                            <div style={{ width: '100%', textAlign: 'right' }}>
                                <Button variant="contained" color="success" className='btn-signup' onClick={handleSignup}>サインアップ</Button>
                            </div>
                            {error && <Alert severity="error">{error}</Alert>}
                            {noti && <Alert severity="success">{noti}</Alert>}
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

export default GymSignUp;