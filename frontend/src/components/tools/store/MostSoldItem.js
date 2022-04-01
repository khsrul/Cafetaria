import axios from 'axios';
import { atom, selector } from 'recoil';

const getInputSoldItem = atom({
    key: 'getInputSoldItem',
    default: '',
})

const getSoldItem = selector({
    key: 'getSoldItem',
    get: async ({ get }) => {
        const item = get(getInputSoldItem);

        if (!item) {
            try {
                const response = await axios.get(`http://localhost:8080/api/sold`);
                return response.data;
            } catch (e) {
                console.log(e.message);
            }
        } else {
            try {
                const response = await axios.get(`http://localhost:8080/api/sold/${item}`);
                return response.data;
            } catch (e) {
                console.log(e.message);
            }
        }
    }
})

export { getInputSoldItem, getSoldItem }