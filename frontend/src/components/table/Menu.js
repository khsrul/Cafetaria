import React, { useState } from 'react'
import { Button, FormControl, Table } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import BtnEditMenu from '../button/BtnEditMenu'
import { dataMenuAdm, getValueMenu } from '../tools/store/DataMenu';
import { theme } from '../tools/store/Theme';
import Pagination from '../pagination';


const Menu = () => {
    const getMenu = useRecoilValue(dataMenuAdm);
    const [search, setSearch] = useRecoilState(getValueMenu);
    const [inputSearch, setInputSearch] = useState('');
    const [currentTheme, setCurrentTheme] = useRecoilState(theme);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    const column = [
        { field: 'Nama Menu' },
        { field: 'Harga' },
        { field: 'Kategori' },
        { field: 'Status' },
        { field: 'Aksi' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        setSearch(inputSearch);
        setInputSearch('');
    }

    // Pagination Init
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = getMenu.slice(indexOfFirstPost, indexOfLastPost);

    // Toggle Next Page on Pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className='position-relative'>
                <form onSubmit={handleSearch}>
                    <span><i style={{ fontSize: '20px' }} className="fa-solid fa-search search-icon menu-search-icon"></i></span>
                    <FormControl
                        placeholder="Cari menu..."
                        aria-label="Search"
                        style={{ paddingLeft: '35px' }} value={inputSearch} onChange={(e) => setInputSearch(e.target.value)}
                    />
                    {
                        !inputSearch ?
                            "" :
                            <span style={{ cursor: 'pointer' }} onClick={() => setInputSearch('')}><i style={{ fontSize: '20px' }} className="fa-solid fa-xmark delete-icon menu-delete-icon"></i></span>
                    }
                    <Button type='submit' hidden></Button>
                </form>
            </div>
            {
                search && (
                    <div className='position-relative py-2'>
                        <span style={{ fontSize: '14px' }} className="badge bg-secondary">Hasil pencarian : {search} <i onClick={() => setSearch('')} style={{ cursor: 'pointer', fontSize: '14px' }} className='fa fa-solid fa-xmark'></i></span>
                    </div>
                )
            }
            <Table responsive className='mt-3'>
                <thead>
                    <tr>
                        {
                            column.map((column, index) => {
                                return <th className={currentTheme == "light" ? 'text-dark' : 'text-white'} key={index}>{column.field}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        getMenu.length === 0 ?
                            <tr><td colSpan={5} className={currentTheme == "light" ? 'text-dark text-center' : 'text-white text-center'}>Menu tidak ada</td></tr>
                            :
                            currentPosts.map(menu => {
                                return (
                                    <tr key={menu.id_menu}>
                                        <td className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{menu.nama_menu}</td>
                                        <td className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Rp. {menu.harga}</td>
                                        <td className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{menu.kategori}</td>
                                        <td className={currentTheme == "light" ? 'text-dark' : 'text-white'}>{menu.status_menu}</td>
                                        <td><BtnEditMenu idMenu={menu.id_menu} namaMenu={menu.nama_menu} hargaMenu={menu.harga} /></td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </Table>
            <div className='d-flex justify-content-end'>
                <Pagination
                    currentPage={currentPage}
                    postsPerPage={postsPerPage}
                    totalPosts={getMenu.length}
                    paginate={paginate}
                />
            </div>
        </>
    )
}

export default Menu