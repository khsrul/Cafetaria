import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import Cart from '../components/card/Cart'
import PesananNotif from '../components/modal/PesananNotif'
import { cartCounter, cartData, notifAddToCart } from '../components/tools/store/Cart'
import DetailOrder from '../components/card/DetailOrder'
import { getTableName } from '../components/tools/store/Table'
import axios from 'axios'
import { getCategoryMenu } from '../components/tools/store/DataMenu'

const Pesanan = () => {
    const [show, setShow] = useState(false);
    const [cartNotif, setCartNotif] = useRecoilState(notifAddToCart);
    const [getTable, setTable] = useRecoilState(getTableName);
    const [inOrderDetail, setOrderDetail] = useRecoilState(cartData);
    const [notifCartCounter, setNotifCartCounter] = useRecoilState(cartCounter);
    const [inputSearch, setInputSearch] = useRecoilState(getCategoryMenu);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOrder = async () => {
        for (let i = 0; i < inOrderDetail.length; i++) {
            const data = new FormData();
            data.append('id_menu', inOrderDetail[i].id);
            data.append('jumlah', inOrderDetail[i].quantity);
            data.append('id_meja', getTable);
            data.append('catatan', inOrderDetail[i].note);

            await axios.post('http://localhost:8080/api/order', data)
                .then(() => {
                    handleShow();
                    setOrderDetail([]);
                    setNotifCartCounter(0);
                    setTable(null);
                });
        }
    }

    const handleBacktoHome = () => {
        setCartNotif(false);
        setInputSearch('');
    }

    return (
        <>
            <div className='fixed-top confirm-order'>
                <Button onClick={handleBacktoHome} style={{ border: 'none', backgroundColor: '#2079B6' }} as={NavLink} to='/'>
                    <i style={{ fontSize: '18px' }} className="fa-solid fa-arrow-left"></i>
                </Button>
                <span className='title-page'>Konfirmasi Pesanan</span>
            </div>
            <article className='page mt-5'>
                <Container>
                    <Row>
                        {
                            inOrderDetail.length >= 1 ?
                                <Col xs={12}>
                                    {
                                        inOrderDetail.map((order) => (
                                            <div className='item-list' key={order.id}>
                                                <Cart
                                                    order={order}
                                                    item={order.name}
                                                    itemPic={`http://localhost:8080/uploads/image/menu/${order.img}`}
                                                    totalItems={order.quantity}
                                                />
                                            </div>
                                        ))
                                    }
                                    <DetailOrder />
                                    <div className='fixed-bottom confirm-btn d-flex justify-content-center align-items-center vw-100'>
                                        <Button variant='primary' onClick={handleOrder}>Konfirmasi Pesanan</Button>
                                    </div>
                                </Col>
                                :
                                <div className='d-flex justify-content-center align-items-center vh-100'>
                                    <span><b>Anda belum memesan makanan</b></span>
                                </div>
                        }
                    </Row>
                </Container>
            </article>
            <PesananNotif show={show} close={handleClose} />
        </>
    )
}

export default Pesanan