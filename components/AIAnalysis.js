'use client'

import { useState, useEffect } from "react"
import { Sparkles, Loader2 } from "lucide-react"

export default function AIAnalysis({salesData, products = []}) {
    const [analysis, setAnalysis] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const generateAnalysis = async () => {
            if(salesData.length === 0) return

            setLoading(true)
            try {
                const response = await fetch('/api/analysis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'},
                        body: JSON.stringify({sales: salesData, products})
                })
                const data = await response.json()
            } catch (error) {
                console.error('Error fetching AI analysis:', error)
                setAnalysis('Erreur lors de la récupération de l\'analyse.')
            } finally {
                setLoading(false)
            }
        }
        generateAnalysis()
    }, [salesData, products])

    return (
        <div className="rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-6 shadow-sm ring-1 ring-gray-900/5 h-full">
            <div className="flex items-center space-x-2 text-purple-700 mb-4">
                <Sparkles className="h-5 w-5"/>
                <h3 className="font-semibold">Analyse AI</h3>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-32 text-purple-500">
                    <Loader2 className="h-6 w-6 animate-spin"/>
                    <span className="ml-2">Géneration de l&apos;analyse..</span>
                </div>
            ): (
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {analysis || 'En attent de données...'}
                </p>
            )}

            <div className="mt-4 text-xs text-gray-500">
                <em>Analyse générée par IA basée sur les données de vente fournies.</em>
            </div>
        </div>
    )
}