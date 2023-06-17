import * as React from 'react';
import './Footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { colors } from '@mui/material';
import { Link } from 'react-router-dom';
import { createTheme } from '@material-ui/core/styles';

const Footer = (props) => {
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Special Elite',
            ].join(','),
        },
    });
    return (
        <div className="footer">
            <div className="footer-top">
                <div>
                    <Link to={'/'} className='footer-gymlogo'>
                        Xingtu<strong>Gym</strong>
                    </Link>
                </div>
                <div>
                    <h3>コンタクト</h3>
                    <div className='footer-contact'>
                        <PhoneIcon />
                        <div>+123-456-7890</div>
                    </div>
                    <div className='footer-contact'>
                        <MailOutlineIcon />
                        <div>xingtugym@hotmail.com</div>
                    </div>
                </div>
                <div>
                    <h3>フォロー</h3>
                    <div className='footer-follow'>
                        <Link target="_blank" style={{ textDecoration: 'none', color: '#0079f2' }} to={'https://www.facebook.com/'}>
                            <FacebookRoundedIcon style={{ fontSize: '50px', }} />
                        </Link>
                        <Link target="_blank" style={{ textDecoration: 'none', color: '#f85a1a' }} to={'https://www.instagram.com/'}>
                            <InstagramIcon style={{ fontSize: '50px', }} />
                        </Link>
                        <Link target="_blank" style={{ textDecoration: 'none', color: '#ff0000' }} to={'https://www.youtube.com/'}>
                            <YouTubeIcon style={{ fontSize: '50px', }} />
                        </Link>
                        <Link target="_blank" style={{ textDecoration: 'none', color: '#00a4f3' }} to={'https://twitter.com/'}>
                            <TwitterIcon style={{ fontSize: '50px', }} />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <span>© 2023 XingtuGym. All rights reserved.</span>
            </div>
        </div>
    )
}

export default Footer;