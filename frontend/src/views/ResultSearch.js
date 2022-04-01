import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import MenuCard from '../components/card/Menu';
import { dataMenuUser, getCategoryMenu } from '../components/tools/store/DataMenu';

const ResultSearch = () => {
    const [search, setsearch] = useRecoilState(getCategoryMenu);
    const getDataSearch = useRecoilValue(dataMenuUser);

    return (
        <>
            <article className='page'>
                <Container>
                    <Row>
                        <Col md={12} xs={12}>
                            {
                                !search ?
                                    <div className='d-flex justify-content-center align-items-center vh-100'>
                                        <span><b>Anda belum mengetik apapaun</b></span>
                                    </div>
                                    :
                                    <>
                                        <h4 className='title-page'>Hasil pencarian untuk {search}</h4>
                                        <Row>
                                            {
                                                getDataSearch.length === 0 ?
                                                    <div className='d-flex justify-content-center align-items-center vh-100'>
                                                        <span><b>Menu tidak ada</b></span>
                                                    </div>
                                                    :
                                                    getDataSearch.map((menu) => (
                                                        <Col md={4} xs={6} key={menu.id_menu}>
                                                            <div className='menu-list'>
                                                                <MenuCard
                                                                    menu={menu}
                                                                    category={menu.kategori}
                                                                    img={`http://localhost:8080/uploads/image/menu/${menu.foto_menu}`}
                                                                    name={menu.nama_menu}
                                                                    price={`Rp. ${menu.harga}`} />
                                                            </div>
                                                        </Col>
                                                    ))
                                            }
                                        </Row>
                                    </>
                            }
                        </Col>
                    </Row>
                </Container>
            </article>
        </>
    )
}

export default ResultSearch