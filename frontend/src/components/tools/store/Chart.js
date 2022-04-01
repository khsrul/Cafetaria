import axios from 'axios';
import { atom, selector } from 'recoil';

const getFilterChart = atom({
    key: 'getFilterChart',
    default: 'Hari ini',
})

const getChartData = selector({
    key: 'getChartData',
    get: async ({ get }) => {
        const getInputFilter = get(getFilterChart);
        const calender = new Date();

        if (getInputFilter === 'Hari ini') {
            let hari = calender.getDate() + '-' + (calender.getMonth() + 1) + '-' + calender.getFullYear();

            try {
                const response = await axios.get(`http://localhost:8080/api/chart/${hari}`)
                return response.data;
            } catch (e) {
                return e.message;
            }
        } else if (getInputFilter === 'Kemarin') {
            let kemarin = calender.getDate() - 1 + '-' + (calender.getMonth() + 1) + '-' + calender.getFullYear();
            
            try {
                const response = await axios.get(`http://localhost:8080/api/chart/${kemarin}`)
                return response.data;
            } catch (e) {
                return e.message;
            }
        } else if (getInputFilter === 'Minggu lalu') {
            let minggu = calender.getDate() - 7 + '-' + (calender.getMonth() + 1) + '-' + calender.getFullYear();
            
            try {
                const response = await axios.get(`http://localhost:8080/api/chart/${minggu}`)
                return response.data;
            } catch (e) {
                return e.message;
            }
        } else {
            let bulan = calender.getDate() - 1 + '-' + (calender.getMonth() + 0) + '-' + calender.getFullYear();
            
            try {
                const response = await axios.get(`http://localhost:8080/api/chart/${bulan}`)
                return response.data;
            } catch (e) {
                return e.message;
            }
        }
    }
})

export { getFilterChart, getChartData }