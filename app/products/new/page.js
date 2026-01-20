'use client'

import ProductForm from "@/components/ProductForm"
import { useDispatch } from "react-redux"
import { addProduct } from "@/lib/features/products/productsSlice"
import { useRouter } from "next/navigation"
import { AwardIcon } from "lucide-react"

export default function NewProductPage() {
    const dispatch = useDispatch()
    const router = useRouter()

    const handleCreate = async (data) => {
        await dispatch(addProduct(data)).unwrap()
        router.push('/products')
    }

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Nouveau Produit</h2>
            <ProductForm onSubmit={handleCreate}/>
        </div>
    )
}