import './loginform.css';

interface LoginPopupProps {
    onClose: () => void;
}

function LoginPopup(props: LoginPopupProps) {

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
                        <input type="email" placeholder="อีเมลของคุณ" className='input-box-login' />
                    </div>
                    <div className="password-box-login">
                        <h4>รหัสผ่าน</h4>
                        <input type="password" placeholder="รหัสผ่านของคุณ" className='input-box-login' />
                    </div>
                    <div className="form-element-login">
                        <input type="checkbox" id='remember-me' />
                        <label> จดจำฉันไว้</label>
                    </div>
                    <button type="submit" className="submit-button-login" onClick={props.onClose}>เข้าสู่ระบบ</button>
                    <label>ยังไม่มีบัญชีผู้ใช้? <a href='#register' >สมัครสมาชิก</a></label>
                    <div className="google-login">
                        <label>หรือ</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPopup;
