'use client'

import { use, useState } from "react"
import { useRouter} from "next/router"
import { Save, X } from "lucide-react"

export default function ProductForm({initialData = {}, onSubmit, isEditing = false}) {
    const router = useRouter()
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        price: '',
        quantity: '',
        description : '',
        ...initialData
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!formData.name || !formData.price) return

        onSubmit({
            ...formData,
            price : parseFloat(formData.price),
            quantity: parseInt(formData.quantity)
        }) 
    }

    return (
        <form className="bg-white p-6 rounded-lg shadow-sm border-gray-200">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom de Produit</label>
                    <input 
                        type="text" 
                        name="name" 
                        required 
                        value={formData.name} 
                        onChange={handleChange} 
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Catégorie</label>
                        <input 
                            type="text" 
                            name="category"
                            list="categories"
                            required 
                            value={formData.category} 
                            onChange={handleChange} 
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                        <datalist id="categories">
                            <option value= "Electronics"></option>
                            <option value= "Fourniture"></option>
                            <option value= "Accessories"></option>
                        </datalist>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Prix $</label>
                        <input 
                            type="number"
                            name="price"
                            min="0"
                            step= "0.01"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Quantité en stock</label>
                    <input 
                        type="number"
                        name="quantity"
                        min="0"
                        required
                        value={formData.quantity}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows={3}
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-100">
                    <button 
                        type="button"
                        onClick={() => router.back()} 
                        className="inline-lfex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        <X className="mr-2 h-4 w-4"/> Annuler
                    </button>
                    <button 
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            <Save className="mr-2 h-4 w-4"/>
                            {isEditing ? 'Sauvegardez': 'Ajouter'}
                    </button>
                </div>
            </div>
        </form>
    )
}