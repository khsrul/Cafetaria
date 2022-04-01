import React from 'react'
import { Nav, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { panelShow } from '../tools/store/Sidebar'
import { useState } from 'react'
import { theme } from '../tools/store/Theme';
import AddTable from '../modal/AddTable';
import { getDataOrder, getDataSold, getInvoiceId } from '../tools/store/Order';
import { getChartData } from '../tools/store/Chart';
import { getSoldItem } from '../tools/store/MostSoldItem';
import { getValueMenu } from '../tools/store/DataMenu';
import { authenticated } from '../tools/store/Auth';

const Index = () => {
    const [displayPanel, setDisplayPanel] = useRecoilState(panelShow);
    const [show, setShow] = useState(false);
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);
    const refreshDataSold = useRecoilRefresher_UNSTABLE(getDataSold);
    const refresherData = useRecoilRefresher_UNSTABLE(getDataOrder);
    const [getInvoice, setInvoice] = useRecoilState(getInvoiceId);
    const refreshChartData = useRecoilRefresher_UNSTABLE(getChartData);
    const refreshMostItemSold = useRecoilRefresher_UNSTABLE(getSoldItem);
    const [search, setSearch] = useRecoilState(getValueMenu);
    const [login, setLogin] = useRecoilState(authenticated);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleRefresh = () => {
        refreshDataSold();
        refresherData();
        setInvoice('');
        refreshChartData();
        refreshMostItemSold();
    }

    return (
        <>
            <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} className={(displayPanel) ? "sidebar" : "sidebar-shrink"}>
                <Nav className="flex-column">
                    <OverlayTrigger
                        key='dashboard'
                        placement='right'
                        overlay={
                            <Tooltip id='tooltip-right'>
                                Dashboard
                            </Tooltip>
                        }
                    >
                        <NavLink to="/admin/dashboard" style={
                            ({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? currentTheme == "light" ? '#fff' : '#06374e' : "",
                                    color: isActive ? currentTheme == "light" ? '#2079B6' : '#2079B6' : "",
                                };
                            }
                        } className={currentTheme == "light" ? 'text-link-light' : 'text-link-dark'} onClick={handleRefresh}>
                            <i className="fa-solid fa-chart-area"></i>
                        </NavLink>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key='menu'
                        placement='right'
                        overlay={
                            <Tooltip id='tooltip-right'>
                                Kelola Menu
                            </Tooltip>
                        }
                    >
                        <NavLink to="/admin/add-menu" style={
                            ({ isActive }) => {
                                return {
                                    backgroundColor: isActive ? currentTheme == "light" ? '#fff' : '#06374e' : "",
                                    color: isActive ? currentTheme == "light" ? '#2079B6' : '#2069e0' : "",
                                };
                            }
                        } className={currentTheme == "light" ? 'text-link-light' : 'text-link-dark'} onClick={() => setSearch('')}>
                            <i className="fa-solid fa-book-open"></i>
                        </NavLink>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key='meja'
                        placement='right'
                        overlay={
                            <Tooltip id='tooltip-right'>
                                Tambah Meja
                            </Tooltip>
                        }
                    >
                        <NavLink to='#' onClick={handleShow} className={currentTheme == "light" ? 'text-link-light' : 'text-link-dark'} >
                            <i className="fa-solid fa-couch"></i>
                        </NavLink>
                    </OverlayTrigger>
                    <OverlayTrigger
                        key='keluar'
                        placement='right'
                        overlay={
                            <Tooltip id='tooltip-right'>
                                Keluar
                            </Tooltip>
                        }
                    >
                        <NavLink to="/admin/login" className={currentTheme == "light" ? 'text-link-light' : 'text-link-dark'} onClick={() => setLogin({auth: false, image: '', username: ''})}>
                            <i className="fa-solid fa-power-off"></i>
                        </NavLink>
                    </OverlayTrigger>
                </Nav>
            </div>
            <AddTable show={show} close={handleClose} />
        </>
    )
}

export default Index