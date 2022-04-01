import React from 'react'
import { Modal } from 'react-bootstrap'

const MenuCardModal = (props) => {
    return (
        <>
            <Modal
                size='lg'
                show={props.show}
                onHide={props.close}
                keyboard={false}
                centered
            >
                <div onClick={props.close} className='position-absolute top-0 end-0 button-close'>
                    <i style={{ fontSize: '40px', color: 'white', marginRight: '10px' }} className="fa-solid fa-xmark"></i>
                </div>
                <img src={props.img} width="100%" height="500" className='modal-image' />
            </Modal>
        </>
    )
}

export default MenuCardModal