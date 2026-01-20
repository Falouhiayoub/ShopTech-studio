'use client'

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, deleteProduct } from "@/lib/features/products/productsSlice"
import { useRouter } from "next/router"
import Link from "next/link"
import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { useParams } from "next/navigation"
import { userAgent } from "next/server"


export default function ProductDetailPage({params}) {
    const {id} = useParams()

    const dispatch = useDispatch()
    const router = useRouter()
    const product = useSelector((state) => state.products.items.find(p => p.id === id))

    const status = useSelector((state) => state.products.status)

    useEffect(() => {
        if(status === 'idle') {
            dispatch(fetchProducts())
        }
    }, [status, dispatch])

    if (!product) {
        if(status === 'loading') return <div className="p-8">Chargement....</div>
        return <div className="p-8">Produit Non Trouvé</div>
    }

    const handleDelete = async () => {
        if(confirm('étes-vous sur de vouloir supprimer ce produit')) {
            await dispatch(deleteProduct(id))
            router.push('/products')
        }
    }

    return (
        <div className="maw-w-3xl mx-auto space-y-6">
            <div className="flex items-center space-x-4 mb-6">
                <button onClick={() => router.back()}
                    className="p-2 hover:bg-gray-200 rounded-full">
                        <ArrowLeft className="h-5 w-5 text-gray-500"/>
                </button>
                <h2 className="text-2xl font-bold text-gray-900">Détail Produit</h2>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                            <span className="inline-block mt-2 px-3 py-1 text-sm font-meidum bg-gray-100 text-gray-800 rounded-full">{product.category}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-4xl font-bold text-blue-600">{product.price}$</p>
                            <p className="text-sm text-gray-500 mt-1">Stock: {product.quantity} unités</p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-900">Description</h3>
                        <p className="mt-2 text-gray-600 leading-relaxed">
                            {product.description || "Aucune description disponible pour ce produit"}
                        </p>
                    </div>
                </div>

                <div className="bg-gray-50 px-8 py-4 border-t border-gray-200 flex justify-end space-x-4">
                    <Link 
                        href={`/products/${id}/edit`}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <Edit className="mr-2 h-4 w-4"/>
                        Modifier
                    </Link>
                    <button 
                        onClick={handleDelete} 
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                        <Trash2 className="mr-2 h-4 w-4"/>
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    )
}