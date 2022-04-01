import React from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { getDataOrder, getInvoiceId } from '../tools/store/Order';
import { theme } from '../tools/store/Theme';

const DCard = (props) => {
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);
    const refresherData = useRecoilRefresher_UNSTABLE(getDataOrder);
    const [getInvoice, setInvoice] = useRecoilState(getInvoiceId);

    const handleCheckOrder = () => {
        refresherData();
        setInvoice('');
    }

    return (
        <>
            <Card style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736', border: 'none', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px' }} className='my-2' >
                <Card.Body>
                    <i style={{ fontSize: '50px', color: '#2079B6', marginTop: '5px' }} className="fa-solid fa-cart-plus d-flex justify-content-center"></i>
                    <p style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center', fontSize: '16px' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>
                        <OverlayTrigger
                            key='refresh-order'
                            placement='bottom'
                            overlay={
                                <Tooltip id='tooltip-bottom'>
                                    Refresh
                                </Tooltip>
                            }
                        >
                            <i style={{ cursor: 'pointer' }} className="fas fa-redo" onClick={() => refresherData()}></i>
                        </OverlayTrigger>
                        &nbsp;{`${props.newOrder} Pesanan Baru`}
                    </p>
                    <footer className="d-flex flex-row justify-content-end">
                        <NavLink to='/admin/cek-pesanan' style={{ textDecoration: 'none' }} onClick={handleCheckOrder} >
                            <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Cek Sekarang</span>
                            <span>
                                <i style={{ color: currentTheme == "light" ? '#4b4b4b' : '#fff', paddingLeft: '10px' }} className="fa-solid fa-angle-right"></i>
                            </span>
                        </NavLink>
                    </footer>
                </Card.Body>
            </Card>
            <Card style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736', height: '155px', border: 'none', boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px', borderRadius: '10px' }} className='my-3' >
                <Card.Body style={{ marginTop: '10px' }}>
                    <i style={{ fontSize: '50px', color: '#2079B6' }} className="fa-solid fa-hand-holding-dollar d-flex justify-content-center"></i>
                    <p style={{ marginTop: '10px', marginBottom: '10px', textAlign: 'center', fontSize: '16px' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{`${props.itemSold} Item Telah Terjual`}</p>
                </Card.Body>
            </Card>
        </>
    )
}

export default DCard