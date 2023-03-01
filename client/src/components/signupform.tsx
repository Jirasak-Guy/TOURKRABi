import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './signupform.css';

export interface SignupPopupProps {
    onClose: () => void;
    onLoginLinkClick: () => void;
}

const initialUser = { username: "", email: "", password: "" };

function SignupPopup(props: SignupPopupProps) {

    const [user, setUser] = useState(initialUser);

    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setUser((currentUser) => ({
            ...currentUser,
            [name]: value,
        }));
    }

    const isValidEmail = (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validateInputs = () => {
        const usernameValue = user.username.trim();
        const emailValue = user.email.trim();
        const passwordValue = user.password.trim();

        let errorMessage: string = "";


        if (usernameValue === '') {
            errorMessage += 'Username is required.\n';
        }

        if (emailValue === '') {
            errorMessage += 'Email is required.\n';
        } else if (!isValidEmail(emailValue)) {
            errorMessage += 'Provide a valid email address.\n'
        }

        if (passwordValue === '') {
            errorMessage += 'Password is required.\n'
        } else if (passwordValue.length < 6) {
            errorMessage += 'Password must be at least 6 characters.\n'
        }
        return errorMessage
    };

    const handleSignup = async () => {
        const url = 'http://localhost:1338/api/auth/local/register'
        try {
            if (user.username && user.password && user.email) {
                const result = await axios.post(url, user)
                if (result) {
                    setUser(initialUser)
                    props.onClose()
                    Swal.fire(
                        `สมัครสมาชิกสำเร็จ!`,
                        'ยินดีต้อนรับสู่เว็บ TOURKRABi ของเรา'
                    )
                }
            } else if (!user.username && !user.password && !user.email) {
                alert('Please complete the information.')
            } else {
                alert(validateInputs());
            }
        } catch (error: any) {
            if (error.response) {
                const { data } = error.response;
                if (data.error.message) {
                    const errorMessage = data.error.message.toLowerCase();
                    alert(errorMessage)
                }
            } else {
                console.log(error);
            }
        }
    }

    return (
        <div className="popup-layout-sigup">
            <div className="popup-overlay-sigup" onClick={props.onClose} />
            <div className="image-sigup" />
            <div className="popup-container-sigup">
                <div id="form" className="sigup-form">
                    <h2>สมัครสมาชิก</h2>
                    <div className="input-control">
                        <label htmlFor="username">ชื่อผู้ใช้</label>
                        <input id="username" name="username" type="text" value={user.username} placeholder="ชื่อผู้ใช้ของคุณ" className='input-box-sigup' onChange={handleChange} />
                        <div className="error"></div>
                    </div>
                    <div className="input-control">
                        <label htmlFor="email">อีเมล</label>
                        <input id="email" name="email" type="text" value={user.email} placeholder="อีเมลของคุณ" className='input-box-sigup' onChange={handleChange} />
                        <div className="error"></div>
                    </div>
                    <div className="input-control">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input id="password" name="password" type="password" value={user.password} placeholder="รหัสผ่านของคุณ" className='input-box-sigup' onChange={handleChange} />
                        <div className="error"></div>
                    </div>
                    <button type="submit" className="submit-button-sigup" onClick={handleSignup}>สมัครสมาชิก</button>
                    <label>มีบัญชีผู้ใช้อยู่แล้ว? <a href='#login' onClick={props.onLoginLinkClick}>ลงชื่อเข้าใช้</a></label>
                    <div className="google-login">
                    </div>
                </ div>
            </div>
        </div>
    );
}

export default SignupPopup;