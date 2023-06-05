import './Footer.css'
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import { colors } from '@mui/material';

const Footer = (props) => {
    return (
        <>
            <div className="footer">
                <div className="footer-top">
                    <div>
                        <h2>XingtuGym</h2>
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
                            <FacebookRoundedIcon />
                            <InstagramIcon />
                            <YouTubeIcon />
                            <TwitterIcon />
                        </div>
                    </div>
                </div>
                <div className='footer-bottom'>
                    <span>© 2023 XingtuGym. All rights reserved.</span>
                </div>
            </div>
        </>
    )
}

export default Footer;