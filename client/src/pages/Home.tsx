import { useEffect, useState } from 'react';
import LoginPopup from '../components/loginform';
import SignupPopup from '../components/signupform';
import Footer from '../components/footer';
import { Box, IconButton, Menu, MenuItem, Button, Drawer, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import { useAuthContext } from '../context/AuthContext';
import conf from '../config/conf';
import { removeToken } from '../helpers';
import { useNavigate } from 'react-router-dom';

import './Home.css';

function Home() {

    const [isFixed, setIsFixed] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);
    const { user } = useAuthContext();
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNav, setAnchorNav] = useState(false);
    const navigate = useNavigate();
    const [windowwidth, setWindowwidth] = useState(window.innerWidth);


    const isPC = (windowwidth >= 830) ? true : false

    useEffect(() => {
        function handleWindowResize() {
            setWindowwidth(window.innerWidth);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    }, []);

    const handleOpenMenu = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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

    const handleLoginClick = () => {
        setShowLogin(true);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleSignupClick = () => {
        setShowSignup(true);
    };

    const handleCloseSignup = () => {
        setShowSignup(false);
    };

    const handleSignupLinkClick = () => {
        setShowLogin(false);
        setShowSignup(true);
    }

    const handleLoginLinkClick = () => {
        setShowLogin(true);
        setShowSignup(false);
    }

    const handleLogout = async () => {
        setAnchorEl(null);
        await removeToken();
        window.location.reload();
    };

    const isUser = (localStorage.getItem("jwt")) ? true : false

    return (
        <div className="page-container">
            <Drawer
                PaperProps={{
                    sx: {
                        backgroundColor: '#1a1a1ac6',
                        color: 'white',
                        width: '60%',
                    }
                }}
                anchor='left'
                open={anchorNav}
                onClose={() => setAnchorNav(false)}
            >
                <Divider />
                <List>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/')}>
                            <ListItemIcon>
                                <img src='../HomeIcon.png' alt="Not found" width={'30'} />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/onedaytrip')}>
                            <ListItemIcon>
                                <img src='../OneDayTripIcon.png' alt="Not found" width={'30'} />
                            </ListItemIcon>
                            <ListItemText primary="One Day Trip" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/packagetrip')}>
                            <ListItemIcon>
                                <img src='../PackageIcon.png' alt="Not found" width={'30'} />
                            </ListItemIcon>
                            <ListItemText primary="Package" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton onClick={() => navigate('/profile')}>
                            <ListItemIcon>
                                <img src='../BookingIcon.png' alt="Not found" width={'30'} />
                            </ListItemIcon>
                            <ListItemText primary="booking" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Drawer>
            {isPC ? (
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
                    {!isUser ? (
                        <nav className="nav-box-right">
                            <ul className="menu-right">
                                <li><a href='#login' onClick={handleLoginClick}>ลงชื่อเข้าใช้</a></li>
                                {showLogin && <LoginPopup onClose={handleCloseLogin} onSignupLinkClick={handleSignupLinkClick} />}
                                <li><a href='#register' onClick={handleSignupClick}>สมัครสมาชิก</a></li>
                                {showSignup && <SignupPopup onClose={handleCloseSignup} onLoginLinkClick={handleLoginLinkClick} />}
                            </ul>
                        </nav>
                    ) : (
                        <Box sx={{ width: "5%", padding: "2%", paddingInline: "20%", display: "flex", alignItems: "center", paddingInlineEnd: "10%" }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenMenu}
                                color="inherit"
                            >
                                <Avatar src={conf.apiPrefix + user?.Avatar.url} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                            >
                                <MenuItem onClick={() => { navigate('/profile') }}>Profile</MenuItem>
                                <MenuItem onClick={() => { handleLogout() }} >Log out</MenuItem>
                            </Menu>
                        </Box>
                    )
                    }
                </header>
            ) : (
                <Box sx={{
                    width: "100%",
                    backgroundColor: "#000",
                    padding: "2%",
                    paddingInline: "3%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, color: "#fff" }}
                        onClick={() => setAnchorNav(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button
                        size="large"
                        aria-label="logo"
                        onClick={() => navigate('/')}
                        color="inherit"
                    >
                        <img src="../applogo.png" alt="(AppIcon)" width={"35%"} background-size={"auto 200%"} background-position={"center"} background-repeat={"no-repeat"} />
                    </Button>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        sx={{ mr: 2, color: "#fff" }}
                        onClick={handleOpenMenu}
                    >
                        <Avatar src={conf.apiPrefix + user?.Avatar.url} />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleCloseMenu}
                    >
                        {isUser ?
                            <div>
                                <MenuItem onClick={() => { navigate('/profile') }}>Profile</MenuItem>
                                <MenuItem onClick={() => { handleLogout() }} >Log out</MenuItem>
                            </div>
                            :
                            <div>
                                <MenuItem onClick={handleLoginClick}>Log in</MenuItem>
                                {showLogin && <LoginPopup onClose={handleCloseLogin} onSignupLinkClick={handleSignupLinkClick} />}
                                <MenuItem onClick={handleSignupClick}>Sign up</MenuItem>
                                {showSignup && <SignupPopup onClose={handleCloseSignup} onLoginLinkClick={handleLoginLinkClick} />}
                            </div>
                        }
                    </Menu>
                </Box>
            )
            }
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
            <a href='#section01' onClick={handleSectionClick} className="scroll-to-top"><span></span></a>
            <Footer></Footer>
        </div >
    )
};

export default Home;