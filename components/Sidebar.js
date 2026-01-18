'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, ShoppingCart, PlusCircle, Icon } from "lucide-react"
import {clsx} from "clsx"
import { twMerge } from "tailwind-merge"

const cn = (...inputs) => twMerge(clsx(inputs))

const navItems = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Produits', href: '/products', icon: Package },
    { name: 'Ajouter Produit', href: '/products/new', icon: PlusCircle },
]

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <div className="flex h-full w-64 flex-col bg-gray-900 text-white">
            <div className="flex h-16 items-center justify-center border-b border-gray-800">
                <h1 className="text-xl font-bold">Shoptech Studio</h1>
            </div>
            <nav className="flex-1 space-y-2 p-4">
                {navItems.map((item) => {
                    const icon = item.icon
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

                    return (
                        <Link key={item.href} href={item.href} className= {cn ("flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors", 
                            isActive ? "bg-blue-600 text-white" : 'text-gray-400 hover:bg-gray-800 hover: hover:text-white'
                            )}
                        >
                            <Icon className="h-5 w-5"/>
                            <span>{item.name}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="p-4 border-t border-gray-800">
                <div className="flex items-center space-x-3 text-sm text-gray-400">
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                        U
                    </div>
                    <div>
                        <p className="text-white">Admin User</p>
                        <p className="text-xs">admin@shoptech.ma</p>
                    </div>
                </div>
            </div>
        </div>
    )
}