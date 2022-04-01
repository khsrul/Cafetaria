import React, { useEffect, useState } from 'react'
import { Modal, Container, Row, Col, ToggleButton, ButtonGroup, Button, Form } from 'react-bootstrap';
import axios from 'axios'
import { useRecoilState } from 'recoil';
import { getTableName } from '../tools/store/Table';

const BtnAddTable = () => {
    const [show, setShow] = useState(false);
    const [dataMeja, setDataMeja] = useState([]);
    const [radioValue, setRadioValue] = useState('');
    const [getTable, setTable] = useRecoilState(getTableName);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getDataMeja = async () => {
        await axios.get('http://localhost:8080/api/table')
            .then((response) => {
                return setDataMeja(response.data)
            });
    }

    useEffect(() => {
        getDataMeja();
    }, [])

    const handleAddTable = () => {
        setTable(radioValue);
        handleClose();
    }

    return (
        <>
            {
                !getTable && (
                    <div className='button-add bg-primary'>
                        <Button style={{ border: 'none', borderRadius: '50%', fontSize: '20px' }} aria-label="Tambah Meja" size="large" onClick={handleShow}>
                            <i className="fa-solid fa-plus"></i>
                        </Button>
                        <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                                <Modal.Title>Tambah Meja</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Container fluid>
                                    <Row>
                                        <Col xs={12}>
                                            <ButtonGroup className="mb-2 flex-wrap">
                                                {dataMeja.map((meja, index) => (
                                                    <ToggleButton
                                                        key={index}
                                                        id={`radio-${index}`}
                                                        type="radio"
                                                        variant="secondary"
                                                        name="radio"
                                                        value={meja.id_meja}
                                                        checked={radioValue === meja.id_meja}
                                                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                                                    >
                                                        {meja.nama_meja}
                                                    </ToggleButton>
                                                ))}
                                            </ButtonGroup>
                                            <Button variant="success" className='d-block mt-3' onClick={handleAddTable}>
                                                Tambah
                                            </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Modal.Body>
                        </Modal>
                    </div>
                )
            }
        </>
    )
}

export default BtnAddTable