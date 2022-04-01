import React from 'react'
import { Chart, Filler } from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil';
import { getChartData } from '../tools/store/Chart';

const ChartLine = () => {
    const chartData = useRecoilValue(getChartData);

    return (
        <>
            <Line style={{ marginTop: '10px' }} datasetIdKey='id'
                data={{
                    labels: chartData.map((item) => (
                        item.nama_menu
                    )),
                    datasets: [
                        {
                            id: 1,
                            label: '',
                            data: chartData.map(item => item.jumlah),
                            backgroundColor: '#cfe2f3',
                            borderColor: '#2079B6',
                            borderWidth: 1.5,
                            fill: true,
                            tension: 0.3,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </>
    )
}

export default ChartLine