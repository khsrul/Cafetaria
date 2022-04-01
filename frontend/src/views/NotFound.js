import React from 'react'
import { Link } from 'react-router-dom'
import notFoundPic from '../components/images/notfound.jpg'

const NotFound = () => {
    return (
        <>
            <div className='position-absolute top-50 start-50 translate-middle text-center text-darked'>
                <img src={notFoundPic} width={300} height={300} />
                <h4>PAGE NOT FOUND</h4>
                <p>Back to <Link to='/'>Home</Link></p>
            </div>
        </>
    )
}

export default NotFound