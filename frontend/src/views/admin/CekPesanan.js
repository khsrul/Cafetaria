import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import TablePesanan from '../../components/table/TablePesanan';
import { panelShow } from '../../components/tools/store/Sidebar';
import { theme } from '../../components/tools/store/Theme';

const CekPesanan = () => {
    const [displayPanel, setPanelShow] = useRecoilState(panelShow);
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);

    return (
        <>
            <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#06374e' }} className={(displayPanel) ? "container-pages vh-100" : "container-side vh-100"}>
                <Container fluid>
                    <Row>
                        <Col>
                            <div className='header-page'>
                                <h4 className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Pesanan Hari Ini</h4>
                            </div>
                            <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} className='card-page'>
                                <Row>
                                    <Col md={12} xs={12}>
                                        <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Data Pesanan</span>
                                    </Col>
                                </Row>
                                <TablePesanan />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}

export default CekPesanan