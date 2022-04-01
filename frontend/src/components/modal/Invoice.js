import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useRecoilState, useRecoilValue } from 'recoil';
import { dataInvoice, getInvoiceId } from '../tools/store/Order';
import { theme } from '../tools/store/Theme';

const Invoice = (props) => {
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);
    const getDataInvoice = useRecoilValue(dataInvoice);
    const [getInvoice, setInvoice] = useRecoilState(getInvoiceId);

    // Toggle print
    const print = () => {
        let content = document.getElementById('printarea');
        let printData = document.getElementById('iframe-content').contentWindow;
        printData.document.open();
        printData.document.write(content.innerHTML);
        printData.document.close();
        printData.focus();
        printData.print();
        props.close();
    }

    return (
        <>
            <Modal show={props.show} onHide={props.close} backdrop="static" keyboard={false}>
                <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#06374e' }} className='d-flex flex-column py-4 px-4'>
                    <div className='d-flex justify-content-between mb-2'>
                        <span className={currentTheme == "light" ? 'text-dark' : 'text-white'} style={{ fontSize: '20px' }}>Struk Pembayaran</span>
                        <span className={currentTheme == "light" ? 'text-dark' : 'text-white'} style={{ fontSize: '20px' }}>Cafeku</span>
                    </div>
                    <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Nomor Struk : {props.struk}</span>
                    <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Tanggal : {props.tanggal}</span>
                    <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Nomor Meja : {props.meja}</span>
                    <hr />
                    {
                        !getInvoice ?
                            <div className='d-flex justify-content-center'>
                                <span className={currentTheme == "light" ? 'text-dark text-center' : 'text-white text-center'}>Data tidak ada</span>
                            </div>
                            :
                            getDataInvoice.map(item => (
                                <div className='d-flex justify-content-between' key={item.id_struk}>
                                    <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{item.nama_menu}</span>
                                    <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>x{item.jumlah}</span>
                                    <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Rp. {item.harga}</span>
                                    <span className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Rp. {item.total_harga}</span>
                                </div>
                            ))
                    }
                    <hr />
                    <div className='d-flex justify-content-center'>
                        <span className={currentTheme == "light" ? 'text-dark text-center' : 'text-white text-center'}>~Terima Kasih~</span>
                    </div>
                </div>
                {/* Print area page (display none) */}
                <div id='printarea' className='d-none'>
                    <div>
                        <span style={{ fontSize: '20px' }}>Struk Pembayaran</span>
                        <span style={{ fontSize: '20px', float: 'right', top: '0' }}>Cafeku</span>
                    </div>
                    <div>
                        <span>Nomor Struk : {props.struk}</span>
                        <span style={{ display: 'block' }}>Tanggal : {props.tanggal}</span>
                        <span>Nomor Meja : {props.meja}</span>
                    </div>
                    <hr />
                    {
                        !getInvoice ?
                            <div><span>Data tidak ada</span></div>
                            :
                            getDataInvoice.map(item => (
                                <div key={item.id_struk}>
                                    <span>{item.nama_menu}</span>
                                    <span> x{item.jumlah}</span>
                                    <span> Rp. {item.harga}</span>
                                    <span> = Rp. {item.total_harga}</span>
                                </div>
                            ))
                    }
                    <hr />
                    <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>~Terima Kasih~</span>
                    </div>
                </div>
                <iframe id="iframe-content" style={{
                    height: '0px',
                    width: '0px',
                    position: 'absolute',
                }}></iframe>
                <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#06374e' }} className='d-flex justify-content-end py-3 px-3'>
                    <Button variant='primary' size='sm' onClick={() => print()}><i className="fa-solid fa-print"></i> Print</Button>
                </div>
            </Modal>
        </>
    )
}

export default Invoice