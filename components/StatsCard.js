import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function StatsCard({title, value, icon:Icon, trend}) {
    return (
        <div className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-900/5">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="mt-2 text-3xl font-semibold text-gray-900">{value}</p>
                </div>
                <div className="rounded-full bg-blue-50 p-3 text-blue-600">
                    <Icon className= "h-6 w-6"/>
                </div>
            </div>
            {trend && (
                <div className="mt-4 flex items-center text-sm">
                    {trend.value > 0 ? (
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500"/>
                    ): (
                        <ArrowDownRight className="mr-1 h-4 w-4 text-red-500"/>
                    )}
                    <span className= {trend.value > 0 ? 'text-green-600' : 'text-red-600'}>
                        {Math.abs(trend.value)}%
                    </span>
                    <span className="ml-2 text-gray-500">From Last month</span>
                </div>
            )}
        </div>
    )
}