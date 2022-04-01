import axios from 'axios';
import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap';
import { useRecoilRefresher_UNSTABLE, useRecoilState, useRecoilValue } from 'recoil';
import Invoice from '../modal/Invoice';
import Pagination from '../pagination';
import { displayAlert } from '../tools/store/Notification';
import { dataInvoice, getDataOrder, getInvoiceId } from '../tools/store/Order';
import { theme } from '../tools/store/Theme';

const TablePesanan = () => {
    // Init variable global
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);
    const [getInvoice, setInvoice] = useRecoilState(getInvoiceId);
    const getData = useRecoilValue(getDataOrder);
    const [showNotif, setShowNotif] = useRecoilState(displayAlert);

    // Init Variable local
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(7);
    const [getDtInvoice, setDtInvoice] = useState({
        struk: '',
        tanggal: '',
        meja: '',
    });
    const [show, setShow] = useState(false);

    // Toggle refresh data order and invoice
    const refresherData = useRecoilRefresher_UNSTABLE(getDataOrder);
    const refreshInvoiceVal = useRecoilRefresher_UNSTABLE(dataInvoice);

    // Trigger modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Row Span Init
    let dataOrder = {};
    const rowSpan = getData.reduce((result, item, key) => {
        if (dataOrder[item.nama_meja] === undefined) {
            dataOrder[item.nama_meja] = key;
            result[key] = 1;
        } else {
            const firstIndex = dataOrder[item.nama_meja];
            if (
                firstIndex === key - 1 ||
                (item.nama_meja === getData[key - 1].nama_meja && result[key - 1] === 0)
            ) {
                result[firstIndex]++;
                result[key] = 0;
            } else {
                result[key] = 1;
                dataOrder[item.nama_meja] = key;
            }
        }
        return result;
    }, []);

    // Pagination Init
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = getData.slice(indexOfFirstPost, indexOfLastPost);

    // Toggle Next Page on Pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Toggle Print and Post data to the server
    const togglePrint = async (index) => {
        // Get date
        const calender = new Date();
        const today = calender.getDate() + '-' + (calender.getMonth() + 1) + '-' + calender.getFullYear();

        // init struk from random number
        let struk = 'CF-' + Math.floor(100 + Math.random() * 9000);

        // Looping data order by rowspan
        for (let i = 0; i < rowSpan[index]; i++) {
            const data = new FormData();
            data.append('id_pesanan', getData[i + index].id_pesanan);
            data.append('total_harga', getData[i + index].jumlah * getData[i + index].harga);
            data.append('tanggal', today);
            data.append('struk', struk);
            // Post/submit data order to server
            try {
                const response = await axios.post('http://localhost:8080/api/invoice', data)
                // if post/submit data success, Update data pesanan
                if (response.data) {
                    const qs = require('qs');
                    const updateDt = {
                        'status_pesanan': 'Selesai',
                    };
                    const options = {
                        method: 'PUT',
                        headers: { 'content-type': 'application/x-www-form-urlencoded' },
                        data: qs.stringify(updateDt),
                        url: `http://localhost:8080/api/order/${getData[i + index].id_pesanan}`,
                    };

                    await axios(options)
                        .then((response) => {
                            // if update data success
                            if (response.data) {
                                refresherData(); // Refresh/update data pesanan
                                setDtInvoice({
                                    struk: struk,
                                    tanggal: today,
                                    meja: getData[i + index].nama_meja,
                                }); // Init data invoice to props on invoice state
                                setInvoice(struk); // init data struk to props on invoice state
                                refreshInvoiceVal(); //refresh/update invoice data
                                // display alert/notif, after post and update data success
                                setShowNotif({
                                    display: true,
                                    bg: 'primary',
                                    text: 'Menyiapkan data untuk diprint...',
                                });
                                setTimeout(() => {
                                    setShowNotif({
                                        display: false,
                                    });
                                }, 5000);
                                clearTimeout();
                            }
                        })
                        .catch((e) => {
                            // if update failed, display alert/notif
                            setShowNotif({
                                display: true,
                                bg: 'danger',
                                text: e.message,
                            });
                            // setTimeout make alert/notif disapear in 5000 (5 sec)
                            setTimeout(() => {
                                setShowNotif({
                                    display: false,
                                    bg: '',
                                    text: '',
                                });
                            }, 4000);
                            clearTimeout();
                        });
                }
            } catch (e) {
                // if post/submit failed, display alert/notif
                setShowNotif({
                    display: true,
                    bg: 'danger',
                    text: e.message,
                });
                // setTimeout make alert/notif disapear in 5000 (5 sec)
                setTimeout(() => {
                    setShowNotif({
                        display: false,
                        bg: '',
                        text: '',
                    });
                }, 4000);
                clearTimeout();
            }
        }
        // display modal invoice after post and update data success (after looping)
        handleShow();
    }

    return (
        <>
            <Table responsive className='mt-3'>
                <thead>
                    <tr>
                        <th className={currentTheme === "light" ? 'text-dark' : 'text-white'}>Nama Menu</th>
                        <th className={currentTheme === "light" ? 'text-dark text-center' : 'text-white text-center'}>Jumlah</th>
                        <th className={currentTheme === "light" ? 'text-dark text-center' : 'text-white text-center'}>Nomor Meja</th>
                        <th className={currentTheme === "light" ? 'text-dark text-center' : 'text-white text-center'}>Catatan</th>
                        <th className={currentTheme === "light" ? 'text-dark text-center' : 'text-white text-center'}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        // if data order empty
                        getData.length == 0 ?
                            <tr>
                                <td colSpan={5} className={currentTheme == "light" ? 'text-dark text-center' : 'text-white text-center'}><b>Tidak ada pesanan</b></td>
                            </tr>
                            :
                            // if data order have an item
                            currentPosts.map((dataOrder, index) => (
                                <tr key={dataOrder.id_pesanan}>
                                    <td className={currentTheme === "light" ? 'text-dark' : 'text-white'}>{dataOrder.nama_menu}</td>
                                    <td className={currentTheme === "light" ? 'text-dark text-center' : 'text-white text-center'}>{dataOrder.jumlah}</td>
                                    {rowSpan[index] > 0 && (
                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }} rowSpan={rowSpan[index]} className={currentTheme === "light" ? 'text-dark' : 'text-white'}>{dataOrder.nama_meja}</td>
                                    )}
                                    <td className={currentTheme === "light" ? 'text-dark text-center' : 'text-white text-center'}>{dataOrder.catatan}</td>
                                    {rowSpan[index] > 0 && (
                                        <td style={{ verticalAlign: 'middle', textAlign: 'center' }} rowSpan={rowSpan[index]}>
                                            <Button size='sm' variant='primary' onClick={() => togglePrint(index)}><i className="fa-solid fa-print"></i> Cetak Struk</Button>
                                        </td>
                                    )}
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
            <div className='d-flex justify-content-end flex-wrap mt-1'>
                {/* Pagination state props */}
                <Pagination
                    show={show}
                    close={handleClose}
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={getData.length}
                    paginate={paginate}
                />
            </div>
            {/* Modal Invoice state props */}
            <Invoice
                show={show}
                close={handleClose}
                struk={getDtInvoice.struk}
                tanggal={getDtInvoice.tanggal}
                meja={getDtInvoice.meja}
            />
        </>
    )
}

export default TablePesanan