import React, { useState } from 'react'
import { Button, Container, Form, Navbar } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { cartCounter, notifAddToCart } from '../tools/store/Cart';
import { getCategoryMenu } from '../tools/store/DataMenu';

const Index = () => {
    const [notifCart, setNotifCart] = useRecoilState(notifAddToCart);
    const [notifCartCounter, setNotifCartCounter] = useRecoilState(cartCounter);
    const [inputSearch, setInputSearch] = useRecoilState(getCategoryMenu);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        setInputSearch(search);
        navigate('/search');
        setSearch('');
    }

    return (
        <>
            <Navbar className='bg-navbar'>
                <Container>
                    <Navbar.Brand href="/" className='title'>Cafe ku</Navbar.Brand>
                    <div className='me-auto'>
                        <div className='navbar-item'>
                            <NavLink to='/'
                                style={({ isActive }) => {
                                    return {
                                        color: isActive ? "#2079B6" : "",
                                    };
                                }} onClick={() => setInputSearch('')} >
                                <i style={{ fontSize: '20px' }} className="fa-solid fa-house"></i>
                            </NavLink>
                            <NavLink to='/menu' style={({ isActive }) => {
                                return {
                                    color: isActive ? "#2079B6" : "",
                                };
                            }} onClick={() => setInputSearch('makanan')} >
                                <i style={{ fontSize: '20px' }} className="fa-solid fa-utensils"></i>
                            </NavLink>
                            <NavLink to='/minuman' style={({ isActive }) => {
                                return {
                                    color: isActive ? "#2079B6" : "",
                                };
                            }} onClick={() => setInputSearch('minuman')} >
                                <i style={{ fontSize: '20px' }} className="fa-solid fa-mug-saucer"></i>
                            </NavLink>
                            <NavLink to='/cemilan' style={({ isActive }) => {
                                return {
                                    color: isActive ? "#2079B6" : "",
                                };
                            }} onClick={() => setInputSearch('cemilan')} >
                                <i style={{ fontSize: '20px' }} className="fa-solid fa-cookie-bite"></i>
                            </NavLink>
                        </div>
                    </div>
                    <div className='d-flex justify-content-end flex-row align-items-center'>
                        <Form className='position-relative' onSubmit={handleSearch}>
                            <Form.Group>
                                <Form.Control className='input-search' type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)} required />
                                <span><i style={{ fontSize: '20px' }} className="fa-solid fa-search search-icon"></i></span>
                                {
                                    !search ?
                                        "" :
                                        <span style={{ cursor: 'pointer' }} onClick={() => setSearch('')}><i style={{ fontSize: '20px' }} className="fa-solid fa-xmark delete-icon"></i></span>
                                }
                            </Form.Group>
                            <Button type='submit' hidden />
                        </Form>
                        <div className='cart-desktop'>
                            <NavLink to='/pesanan' className={notifCart ? "cart-notif cart-counter" : ""} >
                                <i style={{ fontSize: '20px' }} className="fa-solid fa-cart-shopping"></i>
                            </NavLink>
                            {
                                notifCartCounter !== 0 ?
                                    <NavLink to='/pesanan'>
                                        <div className='position-absolute cart-counter'>
                                            <span>{notifCartCounter}</span>
                                        </div>
                                    </NavLink>
                                    : null
                            }
                        </div>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default Index