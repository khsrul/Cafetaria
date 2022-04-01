import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { panelShow } from '../../components/tools/store/Sidebar';
import DataMenu from '../../components/table/Menu'
import FormMenu from '../../components/form/FormAdd';
import { theme } from '../../components/tools/store/Theme';

const Menu = () => {
  const [displayPanel, setPanelShow] = useRecoilState(panelShow);
  const [currentTheme, setCurrentTheme] = useRecoilState(theme);

  return (
    <>
      <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#06374e' }} className={(displayPanel) ? "container-pages" : "container-side"}>
        <Container fluid>
          <Row>
            <Col>
              <div className='header-page'>
                <h4 className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Kelola Menu</h4>
              </div>
              <Row>
                <Col lg={4} md={12} sm={12} xs={12}>
                  <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} className='card-page'>
                    <Row>
                      <Col md={12} xs={12}>
                        <div className='mb-3'>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Tambah Menu</span>
                        </div>
                      </Col>
                    </Row>
                    <FormMenu />
                  </div>
                </Col>
                <Col lg={8} md={12} sm={12} xs={12}>
                  <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} className='card-page edit-menu-section'>
                    <Row>
                      <Col md={12} xs={12}>
                        <div className='mb-3'>
                          <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Data Menu</span>
                        </div>
                      </Col>
                    </Row>
                    <DataMenu />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Menu