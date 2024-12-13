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

  const submitRecruitmentPost = async (id: any) => {
    const recruitmentPost = {
      location: locationRef.current?.value,
      level: levelRef.current?.value || "staff", // Mặc định là 'staff'
      experience: experienceRef.current?.value,
      salary: salaryRef.current?.value,
      quantity: Number(quantityRef.current?.value),
      employmentType: employmentTypeRef.current?.value,
      gender: genderRef.current?.value || "Not required", // Mặc định là 'Not required'
      recruitmentPostId: id,
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/job-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recruitmentPost),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create recruitment post");
      }
      const result = await response.json();
      if (result.error) {
        alert(result.error);
        return; // Nếu có l��i, thông báo và trả về.
      }
      router.push("/recruitment/manage");
    } catch (error) {
      console.error("Error creating recruitment post:", error);
    }
  };
  const submitJobPost = async () => {
    const jobPost = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      datePosted: datePostedRef.current?.value,
      deadline: deadlineRef.current?.value,
      location: locationRef.current?.value,
      employerId: 1,
    };
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/recruitment-post",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobPost),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create job post");
      }
      const result = await response.json();
      if (result.error) {
        alert(result.error);
        return; // Nếu có l��i, thông báo và trả về.
      } else {
        await submitRecruitmentPost(result.data.id);
      }
    } catch (error) {
      console.error("Error creating job post:", error);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitJobPost(); // Gọi hàm gửi bài đăng việc làm
    // Gọi hàm gửi bài đăng tuyển dụng
    // Xử lý gửi bài đăng
  };

  const provincesAndCities = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Cần Thơ",
    "Hải Phòng",
    "Đà Nẵng",
    "Hải Dương",
    "Thái Bình",
    "Nam Định",
    "Ninh Bình",
    "Tuyên Quang",
    "Quảng Ninh",
    "Hà Giang",
    "Lào Cai",
    "Sơn La",
    "Điện Biên",
    "Yên Bái",
    "Hòa Bình",
    "Thanh Hóa",
    "Nghệ An",
    "Hà Tĩnh",
    "Quảng Bình",
    "Quảng Trị",
    "Thừa Thiên Huế",
    "Đắk Lắk",
    "Đắk Nông",
    "Gia Lai",
    "Kon Tum",
    "Khánh Hòa",
    "Ninh Thuận",
    "Bình Thuận",
    "Lâm Đồng",
    "Bình Dương",
    "Đồng Nai",
    "Bà Rịa - Vũng Tàu",
    "Tiền Giang",
    "Bến Tre",
    "Trà Vinh",
    "Vĩnh Long",
    "Đồng Tháp",
    "An Giang",
    "Kiên Giang",
    "Hậu Giang",
    "Sóc Trăng",
    "Bạc Liêu",
    "Cà Mau",
    "Long An",
    "Tây Ninh",
    "Bình Phước",
    "Quảng Nam",
    "Quảng Ngãi",
    "Phú Yên",
    "Thái Nguyên",
    "Lạng Sơn",
    "Cao Bằng",
    "Hà Nam",
    "Hưng Yên",
    "Bắc Ninh",
    "Bắc Giang",
    "Vĩnh Phúc",
    "Mộc Châu"
  ];

  const experienceOptions = [
    "Không yêu cầu kinh nghiệm",
    "Dưới 1 năm",
    "Trên 1 năm",
    "Trên 2 năm",
    "Trên 3 năm",
    "Trên 4 năm",
    "Trên 5 năm",
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
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4 py-2"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Mô tả
            </label>
            <textarea
              ref={descriptionRef}
              required
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4 py-2"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
              className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm h-12 px-4"
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