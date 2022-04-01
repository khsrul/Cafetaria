import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartData, getCartData } from '../tools/store/Cart';
import { getTableName } from '../tools/store/Table';

const DetailOrder = () => {
    const [getTable, setTable] = useRecoilState(getTableName);
    const [inOrderDetail, setOrderDetail] = useRecoilState(cartData);
    const getTotalPrice = useRecoilValue(getCartData);

    return (
        <>

            <div className='detail-order'>
                <span>Rincian Pesanan Meja {getTable}</span>
                {
                    inOrderDetail.map((detailOrder) => (
                        <Row key={detailOrder.id}>
                            <Col>
                                <div className='order-name'>
                                    <p>{`${detailOrder.name} x${detailOrder.quantity}`}</p>
                                </div>
                            </Col>
                            <Col>
                                <div className='item-price'>
                                    <p>{`Rp. ${detailOrder.price * detailOrder.quantity}`}</p>
                                </div>
                            </Col>
                        </Row>
                    ))
                }
                <p style={{marginTop: '10px', fontWeight: 'bold'}}>{`Total pesanan anda Rp ${getTotalPrice},-`}</p>
            </div>
        </>
    )
}

export default DetailOrder