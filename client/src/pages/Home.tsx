import './Home.css';

function Home() {
    return (
        <div className="page-container">
            <header className="nav-bar">
                <nav className="nav-box-left">
                    <ul className="menu-left">
                        <li><a href='#section01' >หน้าหลัก</a></li>
                        <li>
                            <a href='#select' className='select'>แพ็คเกจ</a>
                            <div className="sub-menu">
                                <ul>
                                    <li><a href='#onedaytrip'>One day trip</a></li>
                                    <li><a href='#package'>แพ็คเกจพร้อมที่พัก</a></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </nav>
                <div className="nav-box-center" />
                <nav className="nav-box-right">
                    <ul className="menu-right">
                        <li><a href='#login'  >ลงชื่อเข้าใช้</a></li>
                        <li><a href='#register' >สมัครสมาชิก</a></li>
                    </ul>
                </nav>
            </header>
            <section id="section01" className="box1-container">
                <div className="box1-image-left" />
                <div className="box1-image-center" />
                <div className="box1-image-right" />
                <div className="intro-box">
                    <span className="intro-text1">ทัวร์กระบี่</span>
                    <span className="intro-text2">เรื่องทัวร์ไว้ใจเรา</span>
                </div>
                <a href="#section02" ><span></span><span></span><span></span></a>
            </section >
        </div >
    )
};

export default Home;
