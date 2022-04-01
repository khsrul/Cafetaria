import axios from 'axios'
import { atom, selector } from 'recoil'

// get value from search on data menu for admin

const getValueMenu = atom({
    key: 'getValueMenu',
    default: '',
})

// Display data menu for admin

const dataMenuAdm = selector({
    key: 'dataMenu',
    get: async ({ get }) => {
        let value = get(getValueMenu);
        if (!value) {
            try {
                const response = await axios.get('http://localhost:8080/api/menu')
                return response.data
            } catch (e) {
                return e.message;
            }
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/api/menu/${value}`)
                return response.data
            } catch (e) {
                return e.message;
            }
        }
    }
})

// Display menu/product for user

const getCategoryMenu = atom({
    key: 'getCategoryMenu',
    default: '',
})

const dataMenuUser = selector({
    key: 'data-menu',
    get: async ({ get }) => {
        let category = get(getCategoryMenu);

        if (category === '') {
            try {
                const response = await axios.get(`http://localhost:8080/api/menu/tersedia`)
                return response.data
            } catch (e) {
                return e.response.data;
            }
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/api/menu/${category}/tersedia`)
                return response.data
            } catch (e) {
                return e.response.data.messages;
            }
        }
    }
})

export { getValueMenu, dataMenuAdm, getCategoryMenu, dataMenuUser };