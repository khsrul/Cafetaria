import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authenticated } from '../../components/tools/store/Auth';

const Login = () => {
    const [login, setLogin] = useRecoilState(authenticated);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [getLogin, setDataLogin] = useState([]);
    const [getErrors, setErrors] = useState('');

    const navigate = useNavigate();

    const getDataLogin = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user');
            setDataLogin(response.data);
        } catch (e) {
            return e.message;
        }
    }

    useEffect(() => {
        getDataLogin();
    }, [])


    const handleLogin = (e) => {
        e.preventDefault();
        const index = getLogin.findIndex(id => id.username === username);
        if (index >= 0) {
            if (getLogin[index].password === password) {
                setLogin({
                    ...login,
                    auth: true,
                    image: `http://localhost:8080/uploads/image/users/${getLogin[index].foto_user}`,
                    username: getLogin[index].nama_user,
                })
                navigate('/admin/dashboard')
            } else {
                setErrors('Password yang anda masukkan salah')
            }
        } else {
            setErrors('Akun tidak terdaftar')
        }
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col>
                        <div className='position-absolute top-50 start-50 translate-middle'>
                            {
                                getErrors && (
                                    <Alert variant='danger'>{getErrors}</Alert>
                                )
                            }
                            <Card style={{ border: 'none', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px' }}>
                                <Card.Header style={{ backgroundColor: '#2079B6', color: '#fff' }}>
                                    Login Admin - Cafeku
                                </Card.Header>
                                <Card.Body>
                                    <Form onSubmit={handleLogin}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username" required />
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" required />
                                        </Form.Group>
                                        <div className='d-flex justify-content-center'>
                                            <Button variant="primary" type="submit">
                                                Login
                                            </Button>
                                        </div>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Login