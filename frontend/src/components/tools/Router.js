import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from '../navbar/'
import TabPanel from '../tab/'
import Makanan from '../../views/Makanan'
import Minuman from '../../views/Minuman'
import Cemilan from '../../views/Cemilan'
import Home from '../../views/Home'
import BtnAddTable from '../button/BtnAddTable'
import Footer from '../../views/Footer'
import Pesanan from '../../views/Pesanan'
import Header from '../header'
import Sidebar from '../sidebar'
import Dashboard from '../../views/admin/Dashboard'
import Menu from '../../views/admin/Menu'
import CekPesanan from '../../views/admin/CekPesanan'
import LoginPage from '../../views/admin/Login'
import Spinner from '../spinner'
import SpinnerAdmin from '../spinner/Admin'
import Alert from '../alert/Index'
import NotFound from '../../views/NotFound'
import ResultSearch from '../../views/ResultSearch'
import Auth from './midleware/Auth'
import Admin from './midleware/Admin'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/spinner' element={<Spinner />} />
                <Route path='/' element={
                    <>
                        <Navbar />
                        <TabPanel />
                        <Suspense fallback={<Spinner />}>
                            <Home />
                        </Suspense>
                        <Footer />
                        <BtnAddTable />
                    </>} />
                <Route path='/menu' element={
                    <>
                        <Navbar />
                        <TabPanel />
                        <Suspense fallback={<Spinner />}>
                            <Makanan />
                        </Suspense>
                        <Footer />
                        <BtnAddTable />
                    </>} />

                <Route path='/minuman' element={
                    <>
                        <Navbar />
                        <TabPanel />
                        <Suspense fallback={<Spinner />}>
                            <Minuman />
                        </Suspense>
                        <Footer />
                        <BtnAddTable />
                    </>} />

                <Route path='/cemilan' element={
                    <>
                        <Navbar />
                        <TabPanel />
                        <Suspense fallback={<Spinner />}>
                            <Cemilan />
                        </Suspense>
                        <Footer />
                        <BtnAddTable />
                    </>} />

                <Route path='/pesanan' element={
                    <>
                        <Pesanan />
                    </>} />

                <Route path='/search' element={
                    <>
                        <Navbar />
                        <TabPanel />
                        <Suspense fallback={<Spinner />}>
                            <ResultSearch />
                        </Suspense>
                        <BtnAddTable />
                    </>}
                />

                <Route path='*' element={<NotFound />} />

                {/* ADMIN ROUTE */}

                <Route path='/admin/dashboard' element={
                    <>
                        <Auth>
                            <Alert />
                            <Header />
                            <Sidebar />
                            <Suspense fallback={<SpinnerAdmin />}>
                                <Dashboard />
                            </Suspense>
                        </Auth>
                    </>} />
                <Route path='/admin/add-menu' element={
                    <>
                        <Auth>
                            <Alert />
                            <Header />
                            <Sidebar />
                            <Suspense fallback={<SpinnerAdmin />}>
                                <Menu />
                            </Suspense>
                        </Auth>
                    </>} />
                <Route path='/admin/cek-pesanan' element={
                    <>
                        <Auth>
                            <Alert />
                            <Header />
                            <Sidebar />
                            <Suspense fallback={<SpinnerAdmin />}>
                                <CekPesanan />
                            </Suspense>
                        </Auth>
                    </>} />
                <Route path='/admin/login' element={
                    <>
                        <Admin>
                            <LoginPage />
                        </Admin>
                    </>} />
            </Routes>
        </BrowserRouter >
    )
}

export default Router