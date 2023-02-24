import { useState } from 'react';

import './signupform.css';

const axios = require('axios');
export interface SignupPopupProps {
    onClose: () => void;
    onLoginLinkClick: () => void;
}

const initialUser = { username: "", email: "", password: "" };

function SignupPopup(props: SignupPopupProps) {

    const [user, setUser] = useState(initialUser)

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    }

    const handleSignup = async () => {
        const url = 'http://localhost:1338/api/auth/local/register'
        try {
            if (user.username && user.password && user.email) {
                const res = await axios.post(url, user)
                if (res) {
                    setUser(initialUser)
                }
            }
        } catch (error: any) {
            console.log(error)
        }
    }

    return (
        <div className="popup-layout-sigup">
            <div className="popup-overlay-sigup" onClick={props.onClose} />
            <div className="image-sigup" />
            <div className="popup-container-sigup">
                <div className="box-container-sigup">
                    <h2>สมัครสมาชิก</h2>
                    <div className="username-box-sigup">
                        <h4>ชื่อผู้ใช้</h4>
                        <input type="text" id="username" name='username' value={user.username} placeholder="ชื่อผู้ใช้ของคุณ" className='input-box-sigup' onChange={handleChange} />
                    </div>
                    <div className="email-box-sigup">
                        <h4>อีเมล</h4>
                        <input type="email" id="email" name='email' value={user.email} placeholder="อีเมลของคุณ" className='input-box-sigup' onChange={handleChange} />
                    </div>
                    <div className="password-box-sigup">
                        <h4>รหัสผ่าน</h4>
                        <input type="password" id="password" name='password' value={user.password} placeholder="รหัสผ่านของคุณ" className='input-box-sigup' onChange={handleChange} />
                    </div>
                    <button type="submit" className="submit-button-sigup" onClick={handleSignup}>สมัครสมาชิก</button>
                    <label>มีบัญชีผู้ใช้อยู่แล้ว? <a href='#login' onClick={props.onLoginLinkClick}>ลงชื่อเข้าใช้</a></label>
                    <div className="google-login">
                        <label>หรือ</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPopup;
