'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts } from "@/lib/features/products/productsSlice"
import { fetchSales } from "@/lib/features/sales/salesSlice"
import StatsCard from "@/components/StatsCard"
import RecentSalesTable from "@/components/RecentSalesTable"
import SalesChart from "@/components/SalesChart"
import AIAnalysis from "@/components/AIAnalysis"
import { Package, DollarSign, ShoppingCart, TrendingUp } from "lucide-react"
import { useFormState } from "react-dom"


export default function DashboardPage() {
    const dispatch = useDispatch()
    const {items:products, status: productStatus} = useSelector((state) => state.products)
    const {items:sales, status: salesStatus} = useSelector((state) => state.sales)

    useEffect(() => {
        if(productStatus === 'idle') {
            dispatch(fetchProducts())
        }
        if(salesStatus === 'idle') {
            dispatch(fetchSales())
        }
    }, [dispatch, productStatus, salesStatus])

    const totalStock = products.reduce((acc, p) => acc + parseInt(p.quantity || 0), 0)
    const totalStockValue = products.reduce((acc, p) => acc + (parseInt(p.quantity || 0) * parseFloat(p.price || 0)), 0)
    const totalSold = sales.reduce((acc, s) => acc + parseInt(s.quantity || 0), 0)
    const totalSalesValue = sales.reduce((acc, s) => acc + (parseInt(s.quantity || 0) * parseFloat(s.priceUnit || 0)), 0);


    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold tracking-tight text-gray-900">Dashboard</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cold-4">
                <StatsCard 
                    title= "Stock Total"
                    value={totalStock}
                    icon={Package}
                />
                <StatsCard 
                    title= "Valeur du Stock"
                    value={`${totalStockValue.toLocalString()}$`}
                    icon={DollarSign}
                />
                <StatsCard 
                    title= "Produits Vendus"
                    value={totalSold}
                    icon={ShoppingCart}
                    trend={{ value: 12 }}
                />
                <StatsCard 
                    title= "Revenue Total"
                    value={`${totalSalesValue.toLocalString()}$`}
                    icon={TrendingUp}
                    trend={{ value: 8 }}
                />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <SalesChart salesData={sales} products={products}/>
                </div>
                <div className="col-span-3">
                    <AIAnalysis salesData={sales}/>
                </div>
            </div>
            <RecentSalesTable sales={sales}/>
        </div>
    )
}