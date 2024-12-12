import { number } from "zod";

export interface MenuItemType {
  id: string;
  title: string;
  url: string;
}

export interface JobPost {
  id: number;
  title: string;
  description: string;
  datePosted: string;
  deadline: string;
}

export interface JobDescription {
  location: string;
  experience: string;
  level: string;
  salary: string;
  quantity: string;
  employmentType: string;
  gender: string;
}
export interface JobPostAndDescription {
  industry: string; // Ngành công nghiệp (ví dụ: "Công nghệ thông tin")
  companyName: string; // Tên công ty (ví dụ: "FPT Software")
  postId: number; // ID bài đăng (ví dụ: 1)
  jobTitle: string; // Chức danh công việc (ví dụ: "Senior Java Developer")
  salary: string | null; // Mức lương, có thể là null nếu không có thông tin (ví dụ: null)
  experience: string; // Kinh nghiệm yêu cầu (ví dụ: "5 năm")
  level: string; // Cấp độ công việc (ví dụ: "Senior")
  totalApplications: number; // Tổng số ứng viên đã ứng tuyển (ví dụ: 1)
  averageRating: number; // Đánh giá trung bình (ví dụ: 4.5)
  industryRank: number; // Xếp hạng ngành (ví dụ: 1)
  levelStatus: string;
  location: string;
  quantity: number;
  id: string;
}

export interface RecruitmentPost {
  id: number;
  title: string;
  description: string;
  datePosted: string; // ISO date string
  deadline: string; // ISO date string
  location: string;
  experience: string;
  level: string;
  salary: string;
  quantity: number;
  employmentType: string;
  gender: string;
}
export interface RecordApply {
  appliedDate: string; // Định dạng thời gian ISO 8601
  applicationStatus: string; // Trạng thái đơn ứng tuyển
  title: string; // Tiêu đề công việc
  employeeId: number; // ID của nhân viên
  employeeName: string; // Tên nhân viên
  employeeEmail: string; // Email của nhân viên
  recruitmentPostId: number;
  recordId: number;
}
export interface JobCardData {
  id: number;
  urlLogo: string;
  title: string;
  company: string;
  salary: string;
  location: string[];
  exp: string;
  working_time: string;
  start_date: string;
  end_date: string;
}
