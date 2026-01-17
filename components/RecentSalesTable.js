'use client'

import { useState } from "react"
import { Search, ChevronDown, ChevronUp } from "lucide-react"

export default function RecentSalesTable({sales}) {
    const [sortConfig, setSortConfig] = useState({key: 'date', direction: 'desc'})
    const [filterCategory, setFilterCategory] = useState('')

    const sortedSales = [...sales].sort((a, b) => {
        if(a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? -1 : 1
        }
        if(a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'asc' ? 1 : -1
        }
        return 0
    })

    const filteredSales = sortedSales.filter(sale => 
        filterCategory ? sale.category.toLowercase().includes(filterCategory.toLowerCase()) : true
    )

    const requestSort = (key) => {
        let direction = 'asc'
        if(sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc'
        }
        setSortConfig({key, direction})
    }

    return (
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5 overflow-hidden">
            <div className="border-b border-gray-200 bg-gray-50 px-6 py-4 flex justify-between items-center">
                <h3 className="text-base font-semi-bold text-gray-900">Dérnieres Ventes</h3>
                <div className="relative">
                    <input type="text"
                        placeholder="Filtrer par catégorie..."
                        className="pl-8 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    />
                    <Search className="h-4 w-4 text-gray-400 absolute left-2.5 top-3"/>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {['Produit', 'Catégorie', 'Quantité', 'Prix Unitaire', 'Date'].map((header, index) => {
                                const keyMap = ['productName', 'category', 'quantity', 'priceUnit', 'date']
                                const key = keyMap[index]
                                return (
                                    <th
                                        key={header}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                                        onClick={() => requestSort(key)}
                                    >
                                        <div className="flex items-center space-x-1">
                                            <span>{header}</span>
                                            {sortConfig.key === key && (
                                                sortConfig.direction === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                                            )}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredSales.map((sale) => (
                            <tr key={sale.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sale.productName}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.category}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.quantity}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font text-gray-500">{sale.priceUnit}$</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{sale.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}