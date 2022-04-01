import React from 'react'
import { SetBtnPlusCart } from '../tools/SetBtnPlusCart'
import { useRecoilState } from 'recoil';
import { cartData } from '../tools/store/Cart';
import { Button, Form } from 'react-bootstrap';
import { SetBtnMinCart } from '../tools/SetBtnMinCart';
import { SetBtnDelCart } from '../tools/SetBtnDelCart';

const BtnCart = (props) => {
    const [inOrderDetail, setOrderDetail] = useRecoilState(cartData);

    return (
        <>
            <div className='d-flex justify-content-end icon-order'>
                <Button onClick={() => setOrderDetail(SetBtnMinCart(inOrderDetail, props.order))} style={{ border: 'none', marginRight: '5px' }}>
                    <i className="fa-solid fa-minus"></i>
                </Button>
                <Form.Control type="text" size="sm" value={props.totalItems} readOnly className='text-order' />
                <Button onClick={() => setOrderDetail(SetBtnPlusCart(inOrderDetail, props.order))} style={{ border: 'none', marginLeft: '5px' }}>
                    <i className="fa-solid fa-plus"></i>
                </Button>
                <Button onClick={() => setOrderDetail(SetBtnDelCart(inOrderDetail, props.order))} variant='danger' className='ms-2'>
                    <i className="fa-solid fa-trash-can"></i>
                </Button>
            </div>
        </>
    )
}

export default BtnCart