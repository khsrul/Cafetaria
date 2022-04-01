import React, { useState } from 'react'
import { Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getDataSold, getInvoiceId } from '../tools/store/Order';
import { theme } from '../tools/store/Theme';
import Pagination from '../pagination';

const DataPesanan = () => {
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);
    const getSold = useRecoilValue(getDataSold);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);
    const [getInvoice, setInvoice] = useRecoilState(getInvoiceId);

    // Row Span Init
    let dataSold = {};
    const rowSpan = getSold.reduce((result, item, key) => {
        if (dataSold[item.struk] === undefined) {
            dataSold[item.struk] = key;
            result[key] = 1;
        } else {
            const firstIndex = dataSold[item.struk];
            if (
                firstIndex === key - 1 ||
                (item.struk === getSold[key - 1].struk && result[key - 1] === 0)
            ) {
                result[firstIndex]++;
                result[key] = 0;
            } else {
                result[key] = 1;
                dataSold[item.struk] = key;
            }
        }
        return result;
    }, []);

    // Pagination Init
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = getSold.slice(indexOfFirstPost, indexOfLastPost);

    // Toggle Next Page on Pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {
                getInvoice && (
                    <div className='position-relative py-2'>
                        <span style={{ fontSize: '14px' }} className="badge bg-secondary">Hasil pencarian : {getInvoice} <i onClick={() => setInvoice('')} style={{ cursor: 'pointer', fontSize: '14px' }} className='fa fa-solid fa-xmark'></i></span>
                    </div>
                )
            }
            <Table responsive className='mt-3'>
                <thead>
                    <tr>
                        <th className={currentTheme == "light" ? 'text-dark' : 'text-white'} >No. Struk</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'} >Tanggal</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'} >Nomor Meja</th>
                        <th className={currentTheme == "light" ? 'text-dark' : 'text-white'} >Nama Menu</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'} >Jumlah</th>
                        <th style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'} >Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        getSold.length === 0 ?
                            <tr>
                                <td colSpan={6} className={currentTheme == "light" ? 'text-dark text-center' : 'text-white text-center'}><b>Data pesanan tidak ada</b></td>
                            </tr>
                            :
                            currentPosts.map((itemSold, index) => (
                                <tr key={itemSold.id_struk}>
                                    {rowSpan[index] > 0 && (
                                        <>
                                            <td rowSpan={rowSpan[index]} style={{ verticalAlign: 'middle', textAlign: 'left' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{itemSold.struk}</td>
                                            <td rowSpan={rowSpan[index]} style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme === "light" ? 'text-dark' : 'text-white'}>{itemSold.tanggal}</td>
                                            <td rowSpan={rowSpan[index]} style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme === "light" ? 'text-dark' : 'text-white'}>{itemSold.nama_meja}</td>
                                        </>
                                    )}
                                    <td className={currentTheme === "light" ? 'text-dark' : 'text-white'}>{itemSold.nama_menu}</td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme === "light" ? 'text-dark' : 'text-white'}>{itemSold.jumlah}</td>
                                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }} className={currentTheme === "light" ? 'text-dark' : 'text-white'}>Rp. {itemSold.total_harga}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </Table>
            <div className='d-flex justify-content-end'>
                <Pagination
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={getSold.length}
                    paginate={paginate}
                />
            </div>
        </>
    )
}

export default DataPesanan