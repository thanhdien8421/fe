"use client";
import React, { useState } from "react";

// Định nghĩa kiểu dữ liệu cho form
interface FormData {
  industry: string;
  minRating: number;
  startDate: string;
  endDate: string;
  levelType: string;
}

interface SearchFormProps {
  onSearch: (formData: FormData) => void; // Gửi dữ liệu tìm kiếm khi submit
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const now = new Date(); // Lấy thời gian hiện tại

  // Ngày đầu năm nay
  const startOfYear = new Date(now.getFullYear(), 0, 1)
    .toISOString()
    .split("T")[0]; // 1/1 của năm nay

  // Ngày cuối năm sau
  const endOfNextYear = new Date(now.getFullYear() + 1, 11, 31)
    .toISOString()
    .split("T")[0]; // 31/12 của năm sau

  // Khởi tạo state formData
  const [formData, setFormData] = useState<FormData>({
    industry: "",
    minRating: 1,
    startDate: startOfYear,
    endDate: endOfNextYear,
    levelType: "",
  });

  // Hàm xử lý sự kiện khi người dùng thay đổi giá trị input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Hàm xử lý khi submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(formData); // Gọi onSearch và truyền dữ liệu form
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex  p-4 border-2 rounded-lg bg-white justify-around "
    >
      {/* Industry */}
      <div className="flex flex-col">
        <label htmlFor="industry" className="text-base font-semibold">
          Industry:
        </label>
        <input
          type="text"
          id="industry"
          name="industry"
          className="p-2 border border-gray-300 rounded-md"
          value={formData.industry}
          onChange={handleChange}
          placeholder="Enter industry"
        />
      </div>

      {/* Min Rating */}
      <div className="flex flex-col">
        <label htmlFor="minRating" className="text-base font-semibold">
          Min Rating:
        </label>
        <input
          type="number"
          id="minRating"
          name="minRating"
          className="p-2 border border-gray-300 rounded-md"
          value={formData.minRating}
          onChange={handleChange}
          placeholder="Rating"
        />
      </div>

      {/* Start Date */}
      <div className="flex flex-col ">
        <label htmlFor="startDate" className="text-base font-semibold">
          Start Date:
        </label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          className="p-2 border border-gray-300 rounded-md"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      {/* End Date */}
      <div className="flex flex-col">
        <label htmlFor="endDate" className="text-base font-semibold">
          End Date:
        </label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          className="p-2 border border-gray-300 rounded-md"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      {/* Level Type */}
      <div className="flex flex-col">
        <label htmlFor="levelType" className="text-base font-semibold">
          Level Type:
        </label>
        <select
          id="levelType"
          name="levelType"
          className="p-2 border border-gray-300 rounded-md"
          value={formData.levelType}
          onChange={handleChange}
        >
          <option value="Competition">Competition</option>
          <option value="Attractiveness">Attractiveness</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="flex flex-col justify-center items-center mt-2">
        <button
          type="submit"
          className="bg-sky-600 text-white text-lg rounded-md px-6 py-2 hover:bg-sky-700"
        >
          Tìm kiếm
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
