import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil';
import MenuCard from '../components/card/Menu';
import { getCategoryMenu, dataMenuUser } from '../components/tools/store/DataMenu';

const Makanan = () => {
  const [category, setCategory] = useRecoilState(getCategoryMenu);
  const getAllMenu = useRecoilValue(dataMenuUser);

  useEffect(() => {
    setCategory('makanan');
  }, [])

  return (
    <>
      <article className='page'>
        <Container>
          <Row>
            <Col md={12} xs={12}>
              <h4 className='title-page'>Makanan</h4>
              <Row>
                {
                  getAllMenu.map((menu) => (
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
                  )
                  )
                }
              </Row>
            </Col>
          </Row>
        </Container>
      </article>
    </>
  )
}

export default Makanan