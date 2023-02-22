import './signupform.css';

interface SignupPopupProps {
    onClose: () => void;
}

function SignupPopup(props: SignupPopupProps) {

    return (
        <div className="popup-layout-sigup">
            <div className="popup-overlay-sigup" onClick={props.onClose} />
            <div className="image-sigup" />
            <div className="popup-container-sigup">
                <div className="box-container-sigup">
                    <h2>สมัครสมาชิก</h2>
                    <div className="username-box-sigup">
                        <h4>ชื่อผู้ใช้</h4>
                        <input type="text" placeholder="ชื่อผู้ใช้ของคุณ" className='input-box-sigup' />
                    </div>
                    <div className="email-box-sigup">
                        <h4>อีเมล</h4>
                        <input type="email" placeholder="อีเมลของคุณ" className='input-box-sigup' />
                    </div>
                    <div className="password-box-sigup">
                        <h4>รหัสผ่าน</h4>
                        <input type="password" placeholder="รหัสผ่านของคุณ" className='input-box-sigup' />
                    </div>
                    <button type="submit" className="submit-button-sigup" onClick={props.onClose}>สมัครสมาชิก</button>
                    <label>มีบัญชีผู้ใช้อยู่แล้ว? <a href='#login'>ลงชื่อเข้าใช้</a></label>
                    <div className="google-login">
                        <label>หรือ</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignupPopup;
