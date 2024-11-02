// components/JobItem.tsx
import React from 'react';
import { ChatBubbleLeftIcon, EyeIcon } from '@heroicons/react/24/outline';


interface JobItemProps {
  logo: string;
  title: string;
  company: string;
  date: string;
  status: string;
  salary: string;
  cvLink: string;
}

const JobItem: React.FC<JobItemProps> = ({ logo, title, company, date, status, salary, cvLink }) => {
  return (
    <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-md mb-4">
      <div className="flex items-start">
        <img src={logo} alt={company} className="h-16 w-16 rounded-lg object-contain mr-4" />
        <div className="flex-grow">
          <h3 className="font-semibold text-xl text-gray-900 mb-2">{title}</h3>
          <p className="text-base text-gray-400 mb-1">{company}</p>
          <p className="text-base text-gray-700 mb-1">Thời gian ứng tuyển: {date}</p>
          <p className="text-base text-gray-400 mb-2">
            CV đã ứng tuyển: <a href={cvLink} className="text-green-600 hover:underline">CV tải lên</a>
          </p>
          <hr className="my-2" />
          <p
            className={`text-base font-bold ${
              status.startsWith('NTD đã xem hồ sơ') ? 'text-orange-500' : 'text-blue-500'
            }`}
          >
            {status}
          </p>
        </div>
        <div className="ml-auto flex flex-col items-end">
          <p className="text-lg text-green-600 font-semibold mb-2">{salary}</p>
          <div className="flex space-x-2 mt-[45px]">
            <button className="flex items-center bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold hover:bg-green-200">
              <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
              Nhắn tin
            </button>
            <button className="flex items-center bg-green-100 text-green-700 rounded-full px-3 py-1 text-sm font-semibold hover:bg-green-200">
              <EyeIcon className="h-4 w-4 mr-1" />
              Xem CV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobItem;
