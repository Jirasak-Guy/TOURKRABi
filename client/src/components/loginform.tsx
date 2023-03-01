import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import './loginform.css';

interface LoginPopupProps {
    onClose: () => void;
    onSignupLinkClick: () => void;
}

const initialUser = { identifier: "", password: "" };

const storeUser = (data: any) => {
    localStorage.setItem("username", JSON.stringify(data.user.username));
    localStorage.setItem("jwt", JSON.stringify(data.jwt));
}

export const usernameData = () => {
    const stringifiedUser = localStorage.getItem('username') || '""';
    return JSON.parse(stringifiedUser)
}

function LoginPopup(props: LoginPopupProps) {

    const [user, setUser] = useState(initialUser)

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
        const emailValue = user.identifier.trim();
        const passwordValue = user.password.trim();

        let errorMessage: string = "";

        if (emailValue === '') {
            errorMessage += 'Email is required.\n';
        } else if (isValidEmail(emailValue)) {
            errorMessage += 'Provide a valid email address.\n'
        }

        if (passwordValue === '') {
            errorMessage += 'Password is required.\n'
        }
        return errorMessage
    };

    const handleLoggin = async () => {
        const url = 'http://localhost:1338/api/auth/local'
        try {
            if (isValidEmail(user.identifier)) {
                if (user.identifier && user.password) {
                    const { data } = await axios.post(url, user)
                    if (data.jwt) {
                        storeUser(data)
                        props.onClose()
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: `ลงชื่อเข้าใช้สำเร็จ!\nสวัสดี ${usernameData()}`,
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                } else if (!user.identifier && !user.password) {
                    alert('Please complete the information.')
                } else {
                    alert(validateInputs());
                }
            } else {
                alert('Provide a valid email address.\n')
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
        <div className="popup-layout-login">
            <div className="popup-overlay-login" onClick={props.onClose} />
            <div className="image-login" />
            <div className="popup-container-login">
                <div className="box-container-login">
                    <div className="header-box-login">
                        <h2>ลงชื่อเข้าใช้</h2>
                        <p>ลงชื่อเข้าใช้เพื่อประสบการณ์ที่ดีขึ้น และการจองที่รวดเร็ว</p>
                    </div>
                    <div className="email-box-login">
                        <h4>อีเมล</h4>
                        <input type="email" id="identifier" name="identifier" placeholder="อีเมลของคุณ" className='input-box-login' value={user.identifier} onChange={handleChange} />
                    </div>
                    <div className="password-box-login">
                        <h4>รหัสผ่าน</h4>
                        <input type="password" id="password" name="password" placeholder="รหัสผ่านของคุณ" className='input-box-login' value={user.password} onChange={handleChange} />
                    </div>
                    <div className="form-element-login">
                        <input type="checkbox" id='remember-me' />
                        <label> จดจำฉันไว้</label>
                    </div>
                    <button type="submit" className="submit-button-login" onClick={handleLoggin}>เข้าสู่ระบบ</button>
                    <label>ยังไม่มีบัญชีผู้ใช้? <a href='#register' onClick={props.onSignupLinkClick} >สมัครสมาชิก</a></label>
                    <div className="google-login">
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPopup;
