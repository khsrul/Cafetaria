import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { theme } from '../tools/store/Theme';

const DataPenjualan = (props) => {
  const [currentTheme, setCurrentTheme] = useRecoilState(theme);

  return (
    <>
      <div className='mt-3 card-selling'>
        <Container fluid>
          <Row>
            <Col lg={3} md={12} sm={12} xs={12}>
              <div className='d-flex justify-content-start'>
                <img style={{ borderRadius: '5px' }} width='90' height='90' src={props.itemImg} />
              </div>
            </Col>
            <Col lg={6} md={12} sm={12} xs={12} className='align-self-center'>
              <div className='item-card-selling'>
                <span>{props.itemSell}</span>
                <p className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{props.itemPrice}</p>
                <p className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{props.itemsold}</p>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12} xs={12} className='align-self-center justify-content-center'>
              <Card style={{ border: 'none', borderRadius: '15px 15px', padding: '5px', backgroundColor: '#2079B6', width: '80px' }} >
                <Card.Body style={{ padding: '0', textAlign: 'center', color: '#fff', fontSize: '13px' }}>{props.itemCategory}</Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default DataPenjualan