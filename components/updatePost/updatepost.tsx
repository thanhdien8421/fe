"use client";
import React, { useState } from "react";
import { JobPostAndDescription, RecruitmentPost } from "@/lib/interface";
import { useRouter } from "next/navigation";

interface UpdateFormProps {
  initJob: RecruitmentPost;
}

const UpdatePost: React.FC<UpdateFormProps> = ({ initJob }) => {
  const router = useRouter();
  const [job, setJob] = useState<RecruitmentPost>(initJob);

  // Hàm xử lý thay đổi khi người dùng nhập dữ liệu
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJob((prevJob) => ({
      ...prevJob,
      [name]:
        name === "quantity" || name === "salary"
          ? value.replace(/\D/g, "")
          : value, // Chỉ cho phép số cho "quantity" và "salary"
    }));
  };

  const submitRecruitmentPost = async (id: any, job: RecruitmentPost) => {
    const recruitmentPost = {
      location: job.location,
      level: job.level || "staff", // Mặc định là 'staff'
      experience: job.experience,
      salary: job.salary || "0", // Đảm bảo có giá trị cho salary
      quantity: Number(job.quantity), // Chuyển quantity thành số
      employmentType: job.employmentType || "Not specified", // Giá trị mặc định nếu null
      gender: job.gender || "Not required", // Giá trị mặc định nếu null
      recruitmentPostId: job.id,
    };

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/job-description/${id}`, // Cập nhật URL với ID thích hợp nếu cần
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(recruitmentPost), // Chuyển đối tượng body thành chuỗi JSON
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update recruitment post");
      }

      const result = await response.json();
      if (result.error) {
        alert(result.error);
        return; // Nếu có lỗi, thông báo và trả về.
      }
      router.push("/recruitment/manage");
      console.log("Recruitment post updated:", result);
    } catch (error) {
      console.error("Error updating recruitment post:", error);
    }
  };

  const submitJobPost = async (job: RecruitmentPost) => {
    let userId: any = localStorage.getItem("userId"); // Có thể trả về 'string' hoặc 'null'

    if (userId !== null) {
      userId = parseInt(userId, 10); // Chuyển chuỗi thành số nguyên
    } else {
      console.error("UserId không tồn tại trong localStorage");
      userId = null; // Hoặc gán giá trị mặc định nếu cần
    }

    const jobPost = {
      title: job.title,
      description: job.description,
      datePosted: job.datePosted,
      deadline: job.deadline,
      employerId: userId,
    };
    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/recruitment-post/${job.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job post");
      }

      const result = await response.json();
      if (result.error) {
        alert(result.error);
        return; // Nếu có lỗi, thông báo và trả về.
      } else {
        await submitRecruitmentPost(result.data[0].id, job);
      }
    } catch (error) {
      console.error("Error updating job post:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (job.quantity && isNaN(Number(job.quantity))) {
      alert("Số lượng phải là một số hợp lệ.");
      return;
    }
    if (job.salary && isNaN(Number(job.salary))) {
      alert("Mức lương phải là một số hợp lệ.");
      return;
    }
    await submitJobPost(job); // Gọi hàm gửi bài đăng việc làm với dữ liệu job
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
    "Mộc Châu",
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

  const renderInput = (
    type: string,
    name: keyof RecruitmentPost,
    label: string,
    required = true
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      <input
        type={type}
        name={name}
        value={job[name] || ""} // Đảm bảo value được gán đúng
        onChange={handleChange}
        required={required}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
      />
    </div>
  );

  const renderSelect = (
    name: keyof RecruitmentPost,
    label: string,
    options: string[]
  ) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}:
      </label>
      <select
        name={name}
        value={job[name] || ""}
        onChange={handleChange}
        required
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
      >
        <option value="" disabled>
          Chọn {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">
        Cập Nhật Thông Tin Bài Đăng
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 mx-auto bg-white p-6 rounded-md shadow-md"
      >
        {renderInput("text", "title", "Tiêu đề")}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mô tả:
          </label>
          <textarea
            name="description"
            value={job.description || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Ngày đăng:
          </label>
          <input
            type="date"
            name="datePosted"
            value={job["datePosted"].split("T")[0]}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Hạn chót:
          </label>
          <input
            type="date"
            name="deadline"
            value={job["deadline"]}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          />
        </div>
        {renderSelect("location", "Địa điểm", provincesAndCities)}
        {renderSelect("level", "Cấp độ", [
          "Intern",
          "Junior",
          "Mid-level",
          "Senior",
          "Lead",
        ])}
        {renderSelect("experience", "Kinh nghiệm", experienceOptions)}
        {renderInput("number", "quantity", "Số lượng")}
        {renderInput("text", "salary", "Mức lương")}
        {renderSelect("employmentType", "Loại hình việc làm", [
          "Full-time",
          "Part-time",
          "Internship",
          "Freelance",
        ])}
        {renderSelect("gender", "Giới tính", [
          "Not required",
          "Male",
          "Female",
        ])}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
        >
          Cập Nhật
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;
