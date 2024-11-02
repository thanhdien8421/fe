import { TableDemo } from '@/components/PostingTable/PostingTable'
import React from 'react'

const RecruitmentedList = () => {
    return (
        <div className='flex flex-col justify-center m-7'>
            <h1 className='m-6 text-[1.5rem] text-center'>Danh sách các bài đăng đã tuyển dụng</h1>

            <TableDemo />
        </div>

    )
}

export default RecruitmentedList
