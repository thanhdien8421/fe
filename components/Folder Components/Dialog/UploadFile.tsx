'use client'
import { useState } from 'react';

const CVUpload = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        if (files && files.length > 0) {
            setSelectedFile(files[0]);
        } else {
            setSelectedFile(null); // Nếu không có tệp nào được chọn
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-gray-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 7v14a2 2 0 002 2h14a2 2 0 002-2V7M3 7l9 6 9-6"
                    />
                </svg>
                <h2 className="text-lg font-medium text-gray-800">
                    Tải lên CV từ máy tính, chọn hoặc kéo thả
                </h2>
            </div>
            <p className="text-gray-600 mb-4">
                Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB
            </p>
            <label className="inline-flex items-center bg-gray-200 text-gray-700 px-4 py-2 rounded cursor-pointer hover:text-green-500">
                Chọn CV
                <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".doc,.docx,.pdf"
                />
            </label>
            {selectedFile && <p className="mt-2 text-gray-700">Tệp đã chọn: {selectedFile.name}</p>}
        </div>
    );
};

export default CVUpload;