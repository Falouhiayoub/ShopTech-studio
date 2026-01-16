'use client'

import {Chart as ChartJs, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElment, plugins} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'

ChartJs.register(
    CategoryScale, 
    LinearScale, 
    BarElement, 
    Title, 
    Tooltip, 
    Legend, 
    ArcElment
)


export default function SalesChart({salesData, products}) {
    // sales by product name
    const salesbyProduct = salesData.reduce((acc, sale) => {
        acc[sale.productName] = (acc[sale.productName] || 0) + sale.quantity
        return acc
    },{})
    const labels = Object.keys(salesbyProduct)
    const data = Object.values(salesbyProduct)

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Quantité Vendue',
                data: data,
                backgroundColor: [
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 185, 11, 0.7)',
                    'rgba(239, 68, 68, 0.7)',
                    'rgba(139, 92, 246, 0.7)',
                ],
                borderColor: [
                    'rgb(59, 130, 246)',
                    'rgb(16, 185, 129)',
                    'rgb(245, 158, 11)',
                    'rgb(239, 68, 68)',
                    'rgb(139, 92, 246)',
                ],
                borderWidth: 1
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: "Ventes par Produit"
            }
        }
    }

    return (
        <div className='rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5'>
            <Bar options={options} data={chartData}/>
        </div>
    )
}