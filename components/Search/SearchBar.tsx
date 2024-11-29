'use client'
import React from 'react'
import Select2 from './Select2';
import SearchTag from './SearchTag';
import SearchInput from '../SearchInput/SearchInput';

interface SearchBarProps {
    changeKeyword: React.Dispatch<React.SetStateAction<string>>
}

const SearchBar: React.FC<SearchBarProps> = ({ changeKeyword }) => {
    return (
        <div className='flex flex-row text-center justify-between mt-3 mr-3 border-2 mb-3 rounded-lg bg-white box-border content-between z-10'>
            <div className='m-3 px-4 py-2'>
                <SearchTag />
            </div>
            <p className='m-3 px-4 py-5'>Bộ lọc kết quả:</p>
            <Select2 />
            <input
                type="text"
                placeholder="Từ khóa"
                className="w-[300px] h-10 mt-6 rounded-md border focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent 
                file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 
                dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
                onChange={(e) => changeKeyword(e.target.value.toLowerCase())}
            />
            <div>
                <button className="flex-1 bg-sky-600 text-white text-[1rem] rounded-md m-6 mr-5 px-4 py-2 hover:bg-green-700">
                    Tìm kiếm
                </button>
            </div>
        </div>
    )
}

export default SearchBar