import axios from 'axios';
import { atom, selector } from 'recoil';

const getDataOrder = selector({
    key: 'getDataOrder',
    get: async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/order/diproses');
            return response.data;
        } catch (e) {
            return e.message;
        }
    }
})

const getDataSold = selector({
    key: 'getDataSold',
    get: async ({ get }) => {
        const invoiceId = get(getInvoiceId);
        if (!invoiceId) {
            try {
                const response = await axios.get('http://localhost:8080/api/invoice');
                return response.data;
            } catch (e) {
                return e.message;
            }
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/api/invoice/${invoiceId}`);
                return response.data;
            } catch (e) {
                return e.message;
            }
        }
    }
})

const getInvoiceId = atom({
    key: 'getInvoiceId',
    default: '',
})

const dataInvoice = selector({
    key: 'dataInvoice',
    get: async ({ get }) => {
        const getId = get(getInvoiceId);
        if (!getId) {
            return (null)
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/api/invoice/${getId}`)
                return response.data;
            } catch (e) {
                return e.message;
            }
        }
    }
})


export { getDataOrder, getDataSold, getInvoiceId, dataInvoice }