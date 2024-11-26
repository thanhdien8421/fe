'use client'
import React from 'react'
import Select2 from './Select2';
import SearchTag from './SearchTag';


// interface SearchBarProps {
//     changeKeyword: React.Dispatch<React.SetStateAction<string>>
// }
const SearchBar = () => {

    return (

        <div className='flex flex-row text-center justify-between mt-3 mr-3 border-2 mb-3 rounded-lg bg-white box-border content-between z-10'>
            <div className='m-3 px-4 py-2'>
                <SearchTag />
            </div>
            <div>
                <button className="flex-1 bg-sky-600 text-white text-[1rem] rounded-md m-6 mr-5 px-4 py-2 hover:bg-green-700">
                    Tìm kiếm
                </button>
             </div>
        </div>

    )
}

export default SearchBar
