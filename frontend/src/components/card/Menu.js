import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import MenuCardModal from '../modal/MenuModal';
import { cartCounter, cartData, notifAddToCart } from '../tools/store/Cart';
import { getTableName } from '../tools/store/Table';

const MenuCard = (props) => {
    const [show, setShow] = useState(false);
    const [cartNotif, setCartNotif] = useRecoilState(notifAddToCart);
    const [inOrderDetail, setOrderDetail] = useRecoilState(cartData);
    const [getTable, setTable] = useRecoilState(getTableName);
    const [notifCartCounter, setNotifCartCounter] = useRecoilState(cartCounter);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const addToCart = (menu) => {
        const dupItem = [...inOrderDetail];
        const index = dupItem.findIndex((id => id.id === menu.id_menu));

        if (index >= 0) {
            dupItem[index] = {
                ...dupItem[index],
                quantity: dupItem[index].quantity + 1,
            }
        } else {
            setNotifCartCounter(notifCartCounter + 1);
            dupItem.push({
                id: menu.id_menu,
                img: menu.foto_menu,
                name: menu.nama_menu,
                price: menu.harga,
                quantity: 1,
                note: 'Kosong',
            })
        }

        return dupItem;
    }

    const handleAddToCart = () => {
        setCartNotif(true);
        setOrderDetail(addToCart(props.menu));
    }

    return (
        <>
            <Card style={{ border: 'none', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 5px 10px' }}>
                <Card.Img variant="top" className='card-image' height='300' src={props.img} onClick={() => handleShow()} />
                <Card.Body>
                    <span className="badge bg-primary">{props.category}</span>
                    <div className='d-flex flex-row justify-content-between align-items-center py-2'>
                        <span className='card-items-text'>{props.name}</span>
                        <span className='card-items-price'>{props.price}</span>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button disabled={!getTable} variant="primary" size='sm' className='button-choose' onClick={() => handleAddToCart()}>Pilih</Button>
                    </div>
                </Card.Body>
            </Card>
            <MenuCardModal show={show} close={handleClose} img={props.img} />
        </>
    )
}

export default MenuCard