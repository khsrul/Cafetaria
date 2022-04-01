import React from 'react'
import { Modal } from 'react-bootstrap'

const PesananNotif = (props) => {
    return (
        <>
            <Modal show={props.show} onHide={props.close} centered>
                <Modal.Body>
                    <div className='text-center'>
                        <h4>TERIMA KASIH!</h4>
                        <i onClick={props.close} style={{ color: 'green', fontSize: '120px', cursor: 'pointer', marginBottom: '10px' }} className="fa-solid fa-circle-check"></i>
                        <p>Pesanan anda sedang kami siapkan, silahkan tunggu.</p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PesananNotif