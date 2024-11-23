import { JobPost } from '@/lib/interface'
import Link from 'next/link'
import React from 'react'


export default function JobCard({ job }: { job: JobPost }) {
    return (
        <div key={job.id} className="max-w-sm w-[300px] mx-auto bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer">
            <div className="relative group  bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <Link href={`/job/${job.id}`}>
                    <img className=" w-full h-48 object-cover" src={job.urlLogo} alt="Placeholder Image" />
                </Link>
                <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                        <p className="text-sm">{job.working_time}</p>
                        <p className="text-sm">Kinh nghiệm: {job.exp}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 overflow-hidden">
                <h2 className="text-lg font-semibold whitespace-nowrap text-ellipsis">{job.title}</h2>
                <p className="text-gray-600 whitespace-nowrap animate-overload">{job.nameCompany}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">{job.salary} triệu</span>
                    <span className="text-gray-600">{job.location.join(', ')}</span>
                    {/* <Link target='' href={`/job/${job.id}`} className="text-gray-600 hover:text-gray-800 hover:bg-slate-200 m-[1px] rounded-[1px]" >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h18M3 12h18M3 21h18"></path>
                        </svg>
                    </Link> */}
                </div>
            </div>


        </div>
    )
}