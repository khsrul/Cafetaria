import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col>
                        <div className='footer text-center'>
                            <span>Copyright 2022 <b>Cafe ku</b></span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer