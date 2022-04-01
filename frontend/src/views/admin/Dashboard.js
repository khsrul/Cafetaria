import React, { useState } from 'react'
import { Col, Container, Row, Form, FormControl, Button } from 'react-bootstrap';
import { useRecoilState, useRecoilValue } from 'recoil';
import { panelShow } from '../../components/tools/store/Sidebar';
import Line from '../../components/chart/ChartLine'
import DataPesanan from '../../components/table/DataPesanan'
import DataPenjualan from '../../components/table/DataPenjualan';
import DCard from '../../components/card/DCard';
import { theme } from '../../components/tools/store/Theme';
import { getDataOrder, getDataSold, getInvoiceId } from '../../components/tools/store/Order';
import { getFilterChart } from '../../components/tools/store/Chart';
import { getInputSoldItem, getSoldItem } from '../../components/tools/store/MostSoldItem';

const Dashboard = () => {
  const [displayPanel, setPanelShow] = useRecoilState(panelShow);
  const [currentTheme, setCurrentTheme] = useRecoilState(theme);
  const getData = useRecoilValue(getDataOrder);
  const getSold = useRecoilValue(getDataSold);
  const [search, setSearch] = useState('');
  const [getInvoice, setInvoice] = useRecoilState(getInvoiceId);
  const [getChartInput, setChartInput] = useRecoilState(getFilterChart);
  const [itemSold, setItemSold] = useRecoilState(getInputSoldItem);
  const getMostItemSold = useRecoilValue(getSoldItem);

  const handleSearch = (e) => {
    e.preventDefault();
    setInvoice(search);
    setSearch('');
  }

  return (
    <>
      <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#06374e' }} className={(displayPanel) ? "container-pages" : "container-side"}>
        <Container fluid>
          <Row>
            <Col>
              <div className='header-page'>
                <h4 className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Dashboard</h4>
              </div>
              <Row>
                <Col md={4} xs={12}>
                  <DCard newOrder={getData.length} itemSold={getSold.length} />
                </Col>
                <Col md={8} xs={12}>
                  <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} className='card-page mt-2'>
                    <Row className='align-items-center'>
                      <Col md={8} xs={6}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Statistik Penjualan {getChartInput}</span>
                      </Col>
                      <Col md={4} xs={6} className='justify-content-end'>
                        <Form.Select size="sm" onChange={(e) => setChartInput(e.target.value)}>
                          <option value="Hari ini">Tampilkan Berdasarkan</option>
                          <option value="Kemarin">Kemarin</option>
                          <option value="Minggu lalu">Minggu lalu</option>
                          <option value="Bulan lalu">Bulan lalu</option>
                        </Form.Select>
                      </Col>
                    </Row>
                    <Line />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={7} xs={12}>
                  <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} className='mt-4 mb-2 card-page'>
                    <Row className='align-items-center'>
                      <Col md={6} xs={6}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Riwayat Pesanan</span>
                      </Col>
                      <Col md={6} xs={6} className='justify-content-end'>
                        <div className='position-relative'>
                          <form onSubmit={handleSearch}>
                            <span><i style={{ fontSize: '20px' }} className="fa-solid fa-search search-icon"></i></span>
                            <FormControl
                              placeholder="Cari nomor struk"
                              aria-label="Search"
                              style={{ paddingLeft: '40px' }} value={search} onChange={(e) => setSearch(e.target.value)}
                            />
                            {
                              !search ?
                                "" :
                                <span style={{ cursor: 'pointer' }} onClick={() => setSearch('')}><i style={{ fontSize: '20px' }} className="fa-solid fa-xmark delete-icon"></i></span>
                            }
                            <Button type='submit' hidden></Button>
                          </form>
                        </div>
                      </Col>
                    </Row>
                    <DataPesanan />
                  </div>
                </Col>
                <Col md={5} xs={12}>
                  <div style={{ backgroundColor: currentTheme == "light" ? '#fff' : '#062736' }} className='mb-2 mt-4 card-page'>
                    <Row className='align-items-center'>
                      <Col md={6} xs={6}>
                        <span style={{ fontSize: '18px', fontWeight: 'bold', textTransform: 'uppercase' }} className={currentTheme == "light" ? 'text-dark' : 'text-white'}>Menu Paling Laku</span>
                      </Col>
                      <Col md={6} xs={6} className='justify-content-end'>
                        <Form.Select size="sm" onChange={(e) => setItemSold(e.target.value)}>
                          <option value=''>Tampilkan kategori</option>
                          <option value="Makanan">Makanan</option>
                          <option value="Minuman">Minuman</option>
                          <option value="Cemilan">Cemilan</option>
                        </Form.Select>
                      </Col>
                    </Row>
                    {
                      getMostItemSold.length === 0 ?
                        <div className='d-flex justify-content-center align-items-center py-5'>
                          <span>Tidak ada menu yang ditampilkan</span>
                        </div>
                        :
                        getMostItemSold.map(item => (
                          <DataPenjualan
                            key={item.id_struk}
                            itemImg={`http://localhost:8080/uploads/image/menu/${item.foto_menu}`}
                            itemSell={item.nama_menu}
                            itemPrice={`Rp. ${item.harga}`}
                            itemsold={`${item.jumlah} telah terjual`}
                            itemCategory={item.kategori}
                          />
                        ))
                    }
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default Dashboard