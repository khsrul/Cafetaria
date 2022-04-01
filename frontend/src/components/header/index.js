import React from 'react'
import { Container, Navbar, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { authenticated } from '../tools/store/Auth';
import { panelShow } from '../tools/store/Sidebar'
import { theme } from '../tools/store/Theme';

const Index = () => {
    const [displayPanel, setPanelShow] = useRecoilState(panelShow);
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);
    const [login, setLogin] = useRecoilState(authenticated);

    const toggleSidebar = () => {
        setPanelShow(!displayPanel);
    }

    const toggleTheme = () => {
        if (currentTheme == "light") {
            setCurrentTheme("dark");
        } else {
            setCurrentTheme("light");
        }
    }

    return (
        <>
            <Navbar style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} expand={false} className='header-navbar'>
                <Container fluid>
                    <Navbar.Brand href="/admin" className='header'>Cafe ku</Navbar.Brand>
                    <div className='me-auto'>
                        <OverlayTrigger
                            key='sidebar-toggle'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-bottom'>
                                    {displayPanel ? "Tampilkan Panel" : "Sembunyikan Panel"}
                                </Tooltip>
                            }
                        >
                            <Button style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736', border: 'none', fontSize: '20px', marginLeft: '20px', color: '#2069e0' }} onClick={toggleSidebar}><i className="fa-solid fa-bars"></i></Button>
                        </OverlayTrigger>
                        <OverlayTrigger
                            key='theme-toggle'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-bottom'>
                                    {currentTheme == "light" ? "Dark Mode" : "Light Mode"}
                                </Tooltip>
                            }
                        >
                            <Button style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736', border: 'none', fontSize: '20px', marginLeft: '20px', color: '#2069e0' }} onClick={toggleTheme}><i className={currentTheme == "light" ? "fa-solid fa-moon" : "fa-solid fa-sun"}></i></Button>
                        </OverlayTrigger>
                    </div>
                    <div className='me-3'>
                        <img className='me-2' style={{ borderRadius: '50%' }} height='40' width='40' src={login.image} />
                        <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{login.username}</span>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Index