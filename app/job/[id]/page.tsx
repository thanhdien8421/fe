import DescriptionJobPage from '@/components/DescriptionJob/Description'

import { InfoJob } from '@/lib/data';
import React from 'react'

export default function DescriptinPage({ params }: { params: { id: string } }) {
    const job = InfoJob[parseInt(params.id) - 1];
    console.log(job);
    return (
        <div>
            {job ? <DescriptionJobPage job={job} /> : <p>Không tìm thấy công việc...</p>}

        </div>
    )
}