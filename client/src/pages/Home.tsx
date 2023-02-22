import { useEffect, useState } from 'react';

import './Home.css';

function Home() {

    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = window.document.getElementById('navbar');
            if (navbar && window.pageYOffset > navbar.offsetTop) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const headerClassName = isFixed ? 'nav-bar-fixed' : 'nav-bar';

    const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const section = document.querySelector(e.currentTarget.hash);
        if (section) {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const start = window.pageYOffset;
            const duration = 1000;
            let startTime: number | null = null;

            const animateScroll = (currentTime: number) => {
                if (!startTime) {
                    startTime = currentTime;
                }

                const timeElapsed = currentTime - startTime;
                const scrollY = easeInOutCubic(timeElapsed, start, sectionTop - start, duration);
                window.scrollTo(0, scrollY);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animateScroll);
                }
            };

            const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
                t /= d / 2;
                if (t < 1) {
                    return c / 2 * t * t * t + b;
                }
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            };

            requestAnimationFrame(animateScroll);
        }
    };

    return (
        <div className="page-container">
            <header id="navbar" className={headerClassName}>
                <nav className="nav-box-left">
                    <ul className="menu-left">
                        <li><a href='#section01' onClick={handleSectionClick}>หน้าหลัก</a></li>
                        <li>
                            <a href='#select' className='select'>แพ็คเกจ</a>
                            <div className="sub-menu">
                                <ul>
                                    <li><a href='/onedaytrip'>One day trip</a></li>
                                    <li><a href='/packagetrip'>แพ็คเกจพร้อมที่พัก</a></li>
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
                <a href="#section02" onClick={handleSectionClick}><span></span><span></span><span></span></a>
            </section >
            <section id='section02' className="box2-container">
                <div className="box2-for-text-list">
                    <div className="box2-text-list">
                        <strong>อยากเที่ยวกระบี่ แต่ไม่รู้จะไปที่ไหน</strong>
                        <strong>อยากเที่ยวกระบี่ แต่ไม่รู้จะไปยังไง</strong>
                        <strong>อยากเที่ยวกระบี่ แต่ไม่อยากวางแผนเอง</strong>
                    </div>
                </div>
                <a href='#section03' onClick={handleSectionClick}>
                    <h2 className="box2-text">
                        <span>ทางเรา &quot;TOURKRABi&quot; มีคำตอบให้</span>
                    </h2>
                </a>
            </section>
            <section id="section03" className="box3-container">
                <div className="box3-background" />
                <h1 className="box3-header-text">“ เลือกรูปแบบทัวร์ของคุณ ”</h1>
                <div className="box3-image-container">
                    <a href='/onedaytrip'>
                        <div className="select-odt-image" />
                    </a>
                    <a href='/packagetrip'>
                        <div className="select-package-image" />
                    </a>
                </div>
            </section>
            <div className="footer-container">
                <div className="footer">
                    <p>Copyright</p>
                    <div className='copyright-image' />
                    <p>2023 TOURKRABi</p>
                </div>
            </div>
            <a href='#section01' onClick={handleSectionClick} className="scroll-to-top"><span></span></a>
        </div >
    )
};

export default Home;
