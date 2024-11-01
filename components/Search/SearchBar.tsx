
import React from 'react'
import Select2 from './Select2';

const SearchBar = () => {

    return (

        <div className='flex flex-row text-center justify-center mt-3 mr-3 border-2 mb-3 rounded-lg bg-white box-border'>
            <input
                type="text"
                placeholder="Vị trí ứng tuyển"
                className="flex-1 p-2 outline-none m-3 text-[1rem] border-r-2 border-gray-700 "
            />
            <Select2 />
            <div>
                <button className="flex-1 bg-green-600 text-white text-[1rem] rounded-md m-3  px-4 py-2 hover:bg-green-700">
                    Tìm kiếm
                </button>
            </div>


        </div>

    )
}

export default SearchBar
