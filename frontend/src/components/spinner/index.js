import React from 'react'
import { Spinner } from 'react-bootstrap'

const index = () => {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <Spinner animation="border" variant="primary" />
            </div>
        </>
    )
}

export default index