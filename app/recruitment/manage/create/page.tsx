"use client";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";

function JobPostForm() {
  const router = useRouter();
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const datePostedRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLSelectElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const levelRef = useRef<HTMLSelectElement>(null);
  const salaryRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const employmentTypeRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Xử lý gửi bài đăng
  };

  const provincesAndCities = [
    "Hà Nội", "Hồ Chí Minh", "Cần Thơ", "Hải Phòng", "Đà Nẵng", "Hải Dương"
    // Thêm danh sách đầy đủ
  ];

  const experienceOptions = [
    "Không yêu cầu kinh nghiệm", "Dưới 1 năm", "Trên 1 năm", "Trên 5 năm"
    // Thêm danh sách đầy đủ
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Create Job Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Tiêu đề
            </label>
            <textarea
              ref={titleRef}
              required
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              ref={descriptionRef}
              required
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="datePosted" className="block text-sm font-medium text-gray-700">
                Ngày đăng
              </label>
              <input
                type="datetime-local"
                ref={datePostedRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
                Hạn chót
              </label>
              <input
                type="datetime-local"
                ref={deadlineRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Địa điểm
            </label>
            <select
              ref={locationRef}
              required
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
            >
              <option value="">Chọn địa điểm</option>
              {provincesAndCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                Kinh nghiệm
              </label>
              <select
                ref={experienceRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="">Chọn kinh nghiệm</option>
                {experienceOptions.map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-gray-700">
                Cấp độ
              </label>
              <select
                ref={levelRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="">Chọn cấp độ</option>
                <option value="Intern">Thực tập sinh</option>
                <option value="Junior">Junior</option>
                <option value="Mid-level">Mid-level</option>
                <option value="Senior">Senior</option>
                <option value="Lead">Lead</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
                Mức lương
              </label>
              <input
                type="text"
                ref={salaryRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Số lượng
              </label>
              <input
                type="number"
                ref={quantityRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="employmentType" className="block text-sm font-medium text-gray-700">
                Loại hình việc làm
              </label>
              <select
                ref={employmentTypeRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="Full-time">Toàn thời gian</option>
                <option value="Part-time">Bán thời gian</option>
                <option value="Internship">Thực tập</option>
                <option value="Freelance">Tự do</option>
              </select>
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Giới tính
              </label>
              <select
                ref={genderRef}
                required
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="Not required">Không yêu cầu</option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-all duration-300"
          >
            Tạo Bài Đăng
          </button>
        </form>
      </div>
    </div>
  );
}

export default JobPostForm;
