import React, { useState } from 'react'
import { ButtonGroup, Form, ToggleButton, Button } from 'react-bootstrap'
import axios from 'axios';
import { displayAlert, textFormError } from '../tools/store/Notification';
import { dataMenuAdm } from '../tools/store/DataMenu';
import { useRecoilRefresher_UNSTABLE, useRecoilState } from 'recoil';
import { theme } from '../tools/store/Theme';

const FormMenu = () => {
    // Init variable form
    const [nama, setNama] = useState('');
    const [harga, setHarga] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [foto, setFoto] = useState();

    // Init global variable
    const [showNotif, setShowNotif] = useRecoilState(displayAlert);
    const [getNotifAlert, setNotifAlert] = useState([]);
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);

    // Toggle Refresh data menu
    const refresher = useRecoilRefresher_UNSTABLE(dataMenuAdm);

    const dataCategory = [
        { name: 'Makanan', value: 'Makanan' },
        { name: 'Minuman', value: 'Minuman' },
        { name: 'Cemilan', value: 'Cemilan' },
    ];

    const dataStatus = [
        { name: 'Tersedia', value: 'Tersedia' },
        { name: 'Tidak tersedia', value: 'Tidak tersedia' },
    ];

    // Toggle Add Menu
    const addMenu = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('nama_menu', nama);
        data.append('harga', harga);
        data.append('kategori', category);
        data.append('status_menu', status);
        data.append('foto_menu', foto);

        // Post/submit to server
        try {
            const response = await axios.post('http://localhost:8080/api/menu', data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
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
                refresher();
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
        // Reset Form Value
        setNama('');
        setHarga('');
        setCategory('');
        setStatus('');
    }

    return (
        <>
            <Form onSubmit={addMenu}>
                <Form.Group className="mb-3">
                    <Form.Label className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Nama Menu</Form.Label>
                    <Form.Control type="text" placeholder="Masukkan nama menu" value={nama} onChange={(e) => setNama(e.target.value)} required />
                    {/* if notif = true, show alert/notif */}
                    {getNotifAlert && (
                        <p style={{ color: 'red' }}>{getNotifAlert.nama_menu}</p>
                    )
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Harga</Form.Label>
                    <Form.Control type="text" placeholder="Masukkan harga menu" value={harga} onChange={(e) => { setHarga(e.target.value) }} required />
                    {/* if notif = true, show alert/notif */}
                    {getNotifAlert && (
                        <p style={{ color: 'red' }}>{getNotifAlert.harga}</p>
                    )
                    }
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label style={{ display: 'block' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Kategori</Form.Label>
                    <ButtonGroup className="d-flex justify-content-center mb-0">
                        {dataCategory.map((radio, idx) => (
                            <ToggleButton
                                key={`category-${idx}`}
                                id={`category-${idx}`}
                                type="radio"
                                variant="outline-primary"
                                name="category"
                                value={radio.value}
                                checked={category === radio.value}
                                onChange={(e) => setCategory(e.currentTarget.value)}
                                required >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>
                    {/* if notif = true, show alert/notif */}
                    {getNotifAlert && (
                        <p style={{ color: 'red' }}>{getNotifAlert.kategori}</p>
                    )
                    }
                </Form.Group>
                <ButtonGroup className="mb-3 d-flex justify-content-center ">
                    {dataStatus.map((radio, idx) => (
                        <ToggleButton
                            key={`status-${idx}`}
                            id={`status-${idx}`}
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
                {/* if notif = true, show alert/notif */}
                {getNotifAlert && (
                    <p style={{ color: 'red' }}>{getNotifAlert.status_menu}</p>
                )
                }
                <Form.Group className="mb-3">
                    <Form.Label className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Foto Menu</Form.Label>
                    <Form.Control id='file-input' type="file" size="sm" onChange={(e) => setFoto(e.target.files[0])} required />
                    {/* if notif = true, show alert/notif */}
                    {getNotifAlert && (
                        <p style={{ color: 'red' }}>{getNotifAlert.foto_menu}</p>
                    )
                    }
                </Form.Group>
                <Button variant='success' type='submit'>
                    Tambah
                </Button>
            </Form>
        </>
    )
}

export default FormMenu