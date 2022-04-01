import axios from 'axios';
import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { displayAlert } from '../tools/store/Notification';

const AddTable = (props) => {
    const [table, setTable] = useState('');
    const [showNotif, setShowNotif] = useRecoilState(displayAlert);
    const [getNotifAlert, setNotifAlert] = useState([]);

    const handleAddTable = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nama_meja', table);

        try {
            const response = await axios.post('http://localhost:8080/api/table', data)
            if (response.data) {
                // if success show alert/notif
                setShowNotif({
                    display: true,
                    bg: 'primary',
                    text: response.data.message,
                });
                // setTimeout make alert/notif disapear in 5000 (5 sec)
                setTimeout(() => {
                    setShowNotif({
                        display: false,
                    });
                }, 5000);
                clearTimeout();
                setTable('');
            }
        } catch (e) {
            // if error show alert/notif
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
                console.log(e.message)
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
        }
    }

    return (
        <>
            <Modal show={props.show} onHide={props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Tambah Meja</Modal.Title>
                </Modal.Header>
                <form onSubmit={handleAddTable}>
                    <Modal.Body>
                        <Form.Control value={table} onChange={(e) => setTable(e.target.value)} type="text" placeholder="Masukkan nama meja" required />
                        <span style={{ fontSize: '13px', marginTop: '2px' }}>Contoh : Meja 1, Meja VIP dll.</span>
                        {/* if notif = true, show alert/notif */}
                        {getNotifAlert && (
                            <p style={{ color: 'red' }}>{getNotifAlert.nama_meja}</p>
                        )
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='success' type='submit' style={{ marginRight: '5px' }}>
                            Simpan
                        </Button>
                        <Button variant='primary' onClick={props.close}>
                            Tutup
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default AddTable