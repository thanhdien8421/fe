import { JobPostAndDescription } from '@/lib/interface'
import Link from 'next/link'
import React from 'react'


export default function JobCard({ job }: { job: JobPostAndDescription }) {
    return (
        <Link href={`/recruitment/${job.id}`}>
        <div key={job.id} className="max-w-sm w-[300px] mx-auto bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer z-0">
            <div className="relative group  bg-gray-100 rounded-lg overflow-hidden shadow-lg">
                <img className=" w-full h-48 object-cover" src={"https://scontent.fsgn5-15.fna.fbcdn.net/v/t39.30808-6/467955374_1123651849761550_4970167985120770057_n.jpg?stp=dst-jpg_p526x296&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=89zVEErWbuIQ7kNvgGiiU8a&_nc_zt=23&_nc_ht=scontent.fsgn5-15.fna&_nc_gid=A4P5vsgjR_fFl_Nt8118Fqn&oh=00_AYD8f3PgPzo5aCn3N7nP-g6y7APW-JSaOFQefRfHnvGUTA&oe=67451EBC"} alt="Placeholder Image" />
                <div className="absolute inset-0 bg-black bg-opacity-60 text-white flex items-center justify-center text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                        <p className="text-sm">{job.level}</p>
                        <p className="text-sm">Kinh nghiệm: {job.experience}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 overflow-hidden">
                <h2 className="text-lg font-semibold whitespace-nowrap text-ellipsis">{job.title}</h2>
                <p className="text-gray-600 whitespace-nowrap animate-overload">Số lượng tuyển: {job.quantity}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="bg-gray-200 text-gray-600 text-sm px-3 py-1 rounded-full">{job.salary}</span>
                    <span className="text-gray-600">{job.location}</span>
                </div>
            </div>
        </div>
        </Link>
    )
}