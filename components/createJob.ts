// JobPostForm.tsx
"use client";
import React, { useRef } from "react";

const JobPostForm: React.FC = () => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const datePostedRef = useRef<HTMLInputElement>(null);
  const deadlineRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLInputElement>(null);
  const levelRef = useRef<HTMLInputElement>(null);
  const salaryRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const employmentTypeRef = useRef<HTMLSelectElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const jobPost = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      datePosted: datePostedRef.current?.value,
      deadline: deadlineRef.current?.value,
      location: locationRef.current?.value,
      experience: experienceRef.current?.value,
      level: levelRef.current?.value,
      salary: salaryRef.current?.value,
      quantity: Number(quantityRef.current?.value),
      employmentType: employmentTypeRef.current?.value,
      gender: genderRef.current?.value,
    };

    console.log(jobPost);
    // Gửi dữ liệu đến server ở đây...
  };

  return (
    <div className="">
      <div className="w-[50%] mx-auto bg-white p-8 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Tạo Bài Đăng Tuyển Dụng
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Tiêu đề:
            </label>
            <input
              type="text"
              ref={titleRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Mô tả:
            </label>
            <textarea
              ref={descriptionRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="datePosted"
              className="block text-sm font-medium text-gray-700"
            >
              Ngày đăng:
            </label>
            <input
              type="datetime-local"
              ref={datePostedRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="deadline"
              className="block text-sm font-medium text-gray-700"
            >
              Hạn chót:
            </label>
            <input
              type="datetime-local"
              ref={deadlineRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
              Địa điểm:
            </label>
            <input
              type="text"
              ref={locationRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="experience"
              className="block text-sm font-medium text-gray-700"
            >
              Kinh nghiệm:
            </label>
            <input
              type="text"
              ref={experienceRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="level"
              className="block text-sm font-medium text-gray-700"
            >
              Cấp độ:
            </label>
            <input
              type="text"
              ref={levelRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
              Mức lương:
            </label>
            <input
              type="text"
              ref={salaryRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Số lượng:
            </label>
            <input
              type="number"
              ref={quantityRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="employmentType"
              className="block text-sm font-medium text-gray-700"
            >
              Loại hình việc làm:
            </label>
            <select
              ref={employmentTypeRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Full-time">Toàn thời gian</option>
              <option value="Part-time">Bán thời gian</option>
              <option value="Internship">Thực tập</option>
              <option value="Freelance">Tự do</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-700"
            >
              Giới tính:
            </label>
            <select
              ref={genderRef}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="Not required">Không yêu cầu</option>
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Tạo Bài Đăng
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobPostForm;
