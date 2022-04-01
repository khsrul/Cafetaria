import React from 'react'
import { Alert } from 'react-bootstrap'
import { useRecoilState } from 'recoil';
import { displayAlert } from '../tools/store/Notification';

const Index = () => {
    const [showNotif, setShowNotif] = useRecoilState(displayAlert);
    
    return (
        <>
            {
                showNotif.bg === 'primary' ?
                    <Alert size='sm' variant={showNotif.bg} className={showNotif.display ? 'position-fixed alert-display' : 'position-fixed alert-shrink'}>
                        {showNotif.text}
                    </Alert>
                    :
                    <Alert variant={showNotif.bg} className={showNotif.display ? 'position-fixed alert-display' : 'position-fixed alert-shrink'}>
                        {showNotif.text}
                    </Alert>
            }
        </>
    )
}

export default Index