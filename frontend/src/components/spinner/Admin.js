import React from 'react'
import { Spinner } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { theme } from '../tools/store/Theme';

const Admin = () => {
  const [currentTheme, setCurrentTheme] = useRecoilState(theme);

    return (
        <>
            <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#06374e' }} className='d-flex justify-content-center align-items-center vh-100'>
                <Spinner animation="border" variant="primary" />
            </div>
        </>
    )
}

export default Admin