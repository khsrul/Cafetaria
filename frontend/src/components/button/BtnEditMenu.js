import axios from 'axios';
import React, { useState } from 'react'
import { ButtonGroup, Form, Modal, ToggleButton, Button } from 'react-bootstrap';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { displayAlert } from '../tools/store/Notification';
import { dataMenuAdm } from '../tools/store/DataMenu';

const BtnEditMenu = (props) => {
    const [show, setShow] = useState(false);
    const [harga, setHarga] = useState('');
    const [status, setStatus] = useState('');
    const [showNotif, setShowNotif] = useRecoilState(displayAlert);
    const [getNotifAlert, setNotifAlert] = useState([]);
    const refresher = useRecoilRefresher_UNSTABLE(dataMenuAdm);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dataStatus = [
        { name: 'Tersedia', value: 'Tersedia' },
        { name: 'Tidak tersedia', value: 'Tidak tersedia' },
    ];

    const idMenu = props.idMenu;

    const handleUpdateMenu = async (e) => {
        e.preventDefault();

        const qs = require('qs');
        const data = {
            'harga': harga,
            'status_menu': status,
        };
        const options = {
            method: 'PUT',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            data: qs.stringify(data),
            url: `http://localhost:8080/api/menu/${idMenu}`,
        };

        await axios(options)
            .then((response) => {
                setShowNotif({
                    display: true,
                    bg: 'primary',
                    text: response.data.message,
                });
                setTimeout(() => {
                    setShowNotif({
                        display: false,
                        bg: '',
                        text: '',
                    });
                }, 3000);
                clearTimeout();
                // reset value harga
                setHarga('');
                // Refresh data after update
                refresher();
            })
            .catch((e) => {
                if (e.message) {
                    setShowNotif({
                        display: true,
                        bg: 'danger',
                        text: e.message,
                    });
                    // setTimeout make alert/notif disapear in 5000 (5 sec)
                    setTimeout(() => {
                        setShowNotif({
                            display: false,
                            bg: '',
                            text: '',
                        });
                    }, 4000);
                    clearTimeout();

                    if (e.response.data.messages.error) {
                        setShowNotif({
                            display: true,
                            bg: 'danger',
                            text: e.response.data.messages.error,
                        });
                        // setTimeout make alert/notif disapear in 5000 (5 sec)
                        setTimeout(() => {
                            setShowNotif({
                                display: false,
                                bg: '',
                                text: '',
                            });
                        }, 4000);
                        clearTimeout();
                        // reset notif alert
                        setNotifAlert([]);
                    } else {
                        // set notif alert by e.response.data.messages
                        setNotifAlert(e.response.data.messages);
                    }
                }
            });
        // Close Modal
        handleClose();
    }

    return (
        <>
            <Button variant='primary' size='sm' className='me-2' onClick={handleShow}><i className="fa-solid fa-pencil"></i> Edit Data</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.namaMenu}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={handleUpdateMenu}>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Harga Baru</Form.Label>
                            <Form.Control type="text" placeholder={props.hargaMenu} value={harga} onChange={(e) => setHarga(e.target.value)} required />
                            {/* if notif = true, show alert/notif */}
                            {getNotifAlert && (
                                <p style={{ color: 'red' }}>{getNotifAlert.harga}</p>
                            )
                            }
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <ButtonGroup className="d-flex justify-content-center">
                                {dataStatus.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`status-edit-${idx}`}
                                        type="radio"
                                        variant="outline-secondary"
                                        name="status"
                                        value={radio.value}
                                        checked={status === radio.value}
                                        onChange={(e) => setStatus(e.currentTarget.value)}
                                        required >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
                            {getNotifAlert && (
                                <p style={{ color: 'red' }}>{getNotifAlert.status_menu}</p>
                            )
                            }
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='success' type='submit'>
                            Simpan
                        </Button>
                        <Button variant='primary' className='mx-2' onClick={handleClose}>
                            Batal
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}

export default BtnEditMenu