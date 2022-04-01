import React from 'react'
import { NavLink } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import { cartCounter, notifAddToCart } from '../tools/store/Cart';
import { useRecoilState } from 'recoil';
import { getCategoryMenu } from '../tools/store/DataMenu';

const Index = () => {
    const [notifCart, setNotifCart] = useRecoilState(notifAddToCart);
    const [notifCartCounter, setNotifCartCounter] = useRecoilState(cartCounter);
    const [getCategory, setGetCategory] = useRecoilState(getCategoryMenu);

    return (
        <>
            <div className='category'>
                <Container>
                    <Row className='justify-content-start'>
                        <Col>
                            <div className='d-flex justify-content-center'>
                                <NavLink to='/'
                                    style={({ isActive }) => {
                                        return {
                                            color: isActive ? "#2079B6" : "",
                                        };
                                    }} onClick={() => setGetCategory('')} >
                                    <i style={{ fontSize: '20px' }} className="fa-solid fa-house"></i>
                                </NavLink>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex justify-content-center'>
                                <NavLink to='/menu' style={({ isActive }) => {
                                    return {
                                        color: isActive ? "#2079B6" : "",
                                    };
                                }} onClick={() => setGetCategory('makanan')} >
                                    <i style={{ fontSize: '20px' }} className="fa-solid fa-utensils"></i>
                                </NavLink>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex justify-content-center'>
                                <NavLink to='/minuman' style={({ isActive }) => {
                                    return {
                                        color: isActive ? "#2079B6" : "",
                                    };
                                }} onClick={() => setGetCategory('minuman')} >
                                    <i style={{ fontSize: '20px' }} className="fa-solid fa-mug-saucer"></i>
                                </NavLink>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex justify-content-center'>
                                <NavLink to='/cemilan' style={({ isActive }) => {
                                    return {
                                        color: isActive ? "#2079B6" : "",
                                    };
                                }} onClick={() => setGetCategory('cemilan')} >
                                    <i style={{ fontSize: '20px' }} className="fa-solid fa-cookie-bite"></i>
                                </NavLink>
                            </div>
                        </Col>
                        <Col>
                            <div className='d-flex justify-content-center'>
                                <NavLink to='/pesanan' className={notifCart ? "cart-notif cart-counter" : ""} >
                                    <i style={{ fontSize: '20px' }} className="fa-solid fa-cart-shopping"></i>
                                </NavLink>
                            </div>
                            {
                                notifCartCounter !== 0 ?
                                    <NavLink to='/pesanan'>
                                        <div className='position-absolute cart-counter'>
                                            <span>{notifCartCounter}</span>
                                        </div>
                                    </NavLink>
                                    : null
                            }
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default Index