import { JobPost } from '@/lib/interface'
import React from 'react'

export default function JobCard({data}:{data:JobPost}) {
    return (
        <div className="max-w-xs bg-white border rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-48 object-fit" src={data.image} alt="Placeholder Image" />
            <div className="p-4">
                <h2 className="text-lg font-semibold"></h2>
                <p className="text-gray-600">{data.content}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">{data.salary}</span>
                    <span className="text-gray-600">{data.destination}</span>
                    <button className="text-gray-600 hover:text-gray-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h18M3 12h18M3 21h18"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
