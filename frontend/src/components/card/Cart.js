import React, { useState } from 'react'
import { Card, Row, Col, Form, Button } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { cartCounter, cartData } from '../tools/store/Cart';

const Cart = (props) => {
    const [inOrderDetail, setOrderDetail] = useRecoilState(cartData);
    const [notifCartCounter, setNotifCartCounter] = useRecoilState(cartCounter);

    const handleInputNotes = (order) => (e) => {
        const dupItem = [...inOrderDetail];
        const index = dupItem.findIndex((id => id.id === order.id));

        dupItem[index] = {
            ...dupItem[index],
            note: e.target.value,
        }

        setOrderDetail(dupItem);
    }

    const SetBtnMinCart = (order) => {
        const dupItem = [...inOrderDetail];
        const index = dupItem.findIndex((id => id.id === order.id));

        if (dupItem[index].quantity > 1) {
            dupItem[index] = {
                ...dupItem[index],
                quantity: dupItem[index].quantity - 1,
            }
        } else {
            dupItem.splice(index, 1);
            setNotifCartCounter(notifCartCounter - 1);
        }

        return dupItem;
    }

    const SetBtnPlusCart = (order) => {
        const dupItem = [...inOrderDetail];
        const index = dupItem.findIndex((id => id.id === order.id));

        dupItem[index] = {
            ...dupItem[index],
            quantity: dupItem[index].quantity + 1,
        }

        return dupItem;
    }

    const SetBtnDelCart = (order) => {
        const dupItem = [...inOrderDetail];
        const index = dupItem.findIndex((id => id.id === order.id));

        dupItem.splice(index, 1);
        setNotifCartCounter(notifCartCounter - 1);

        return dupItem;
    }

    return (
        <>
            <Card style={{ border: 'none', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 5px 10px' }}>
                <Card.Header style={{ borderBottom: '0', backgroundColor: '#fff' }}>{props.item}</Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={3} xs={4}>
                            <img style={{ borderRadius: '5px' }} src={props.itemPic} className='order-pics' />
                        </Col>
                        <Col md={9} xs={8}>
                            <div className='order-item'>
                                <Form.Control type="text" placeholder='Tulis Catatan' onChange={handleInputNotes(props.order)} />
                                <Form.Text muted>
                                    <i>Misal : tidak pedas, dibungkus dll.</i>
                                </Form.Text>
                            </div>
                            <div className='d-flex justify-content-end icon-order'>
                                <Button onClick={() => setOrderDetail(SetBtnMinCart(props.order))} style={{ border: 'none', marginRight: '5px' }}>
                                    <i className="fa-solid fa-minus"></i>
                                </Button>
                                <Form.Control type="text" size="sm" value={props.totalItems} readOnly className='text-order' />
                                <Button onClick={() => setOrderDetail(SetBtnPlusCart(props.order))} style={{ border: 'none', marginLeft: '5px' }}>
                                    <i className="fa-solid fa-plus"></i>
                                </Button>
                                <Button onClick={() => setOrderDetail(SetBtnDelCart(props.order))} variant='danger' className='ms-2'>
                                    <i className="fa-solid fa-trash-can"></i>
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </>
    )
}

export default Cart