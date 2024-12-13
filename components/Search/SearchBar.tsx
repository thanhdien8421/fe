"use client";
import React, { useState } from "react";
import { FaIndustry, FaStar, FaCalendarAlt, FaChartLine } from "react-icons/fa";

interface FormData {
  industry: string;
  minRating: number;
  startDate: string;
  endDate: string;
  levelType: string;
}

interface SearchFormProps {
  onSearch: (formData: FormData) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1).toISOString().split("T")[0];
  const endOfNextYear = new Date(now.getFullYear() + 1, 11, 31).toISOString().split("T")[0];

  const [formData, setFormData] = useState<FormData>({
    industry: "",
    minRating: 1,
    startDate: startOfYear,
    endDate: endOfNextYear,
    levelType: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Industry */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaIndustry className="text-blue-500" />
              Ngành nghề
            </label>
            <input
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Nhập ngành nghề..."
              className="w-full h-[48px] px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Min Rating */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaStar className="text-yellow-500" />
              Đánh giá tối thiểu
            </label>
            <input
              type="number"
              name="minRating"
              min="1"
              max="5"
              value={formData.minRating}
              onChange={handleChange}
              className="w-full h-[48px] px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaCalendarAlt className="text-blue-500" />
              Ngày bắt đầu
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full h-[48px] px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* End Date */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaCalendarAlt className="text-blue-500" />
              Ngày kết thúc
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full h-[48px] px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
          </div>

          {/* Level Type */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <FaChartLine className="text-blue-500" />
              Loại cấp độ
            </label>
            <select
              name="levelType"
              value={formData.levelType}
              onChange={handleChange}
              className="w-full h-[48px] px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
            >
              <option value="">Chọn loại cấp độ</option>
              <option value="Competition">Cạnh tranh</option>
              <option value="Attractiveness">Hấp dẫn</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg 
                     hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 
                     transition-all duration-200 flex items-center gap-2"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Tìm kiếm
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;