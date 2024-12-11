import { JobPostAndDescription } from "@/lib/interface";
import Link from "next/link";
import React from "react";

export default function JobCard({ job }: { job: JobPostAndDescription }) {
  return (
    <Link href={`/recruitment/${job.postId}`}>
      <div
        key={job.postId}
        className="max-w-sm w-[300px] mx-auto bg-white border rounded-lg shadow-md overflow-hidden cursor-pointer z-0"
      >
        <div className="relative group bg-gray-100 rounded-lg overflow-hidden shadow-lg">
          <img
            className="w-full h-48 object-fit"
            src={"/images/0f2d9460-23d7-4870-bc2b-133ca46f5d29.webp"}
            alt="Job Post Image"
          />
        </div>

        <div className="p-4 overflow-hidden">
          <h2 className=" text-lg font-semibold whitespace-nowrap text-ellipsis">
            {job.jobTitle}
          </h2>

          <div className="text-sm text-gray-600 mt-2 text-start pl-[20px]">
            {job.companyName && (
              <p className="text-base">
                <strong>Công ty:</strong> {job.companyName}
              </p>
            )}
            {job.industry && (
              <p className="text-base">
                <strong>Lĩnh vực:</strong> {job.industry}
              </p>
            )}
            {job.averageRating && (
              <p className="text-base">
                <strong>Đánh giá trung bình:</strong> {job.averageRating}
              </p>
            )}

            {job.location && (
              <p className="text-base">
                <strong>Địa điểm:</strong> {job.location}
              </p>
            )}
            <p className="text-base">
              <strong>Trình độ:</strong> {job.level}
            </p>
            {job.salary && (
              <p className="text-base">
                <strong>Lương:</strong> {job.salary}
              </p>
            )}
            {job.quantity && (
              <p className="text-base">
                <strong>Số lượng tuyển:</strong> {job.quantity}
              </p>
            )}
            {job.totalApplications && (
              <p className="text-base">
                <strong>Số ứng viên đã ứng tuyển:</strong>{" "}
                {job.totalApplications}
              </p>
            )}
            {job.levelStatus && (
              <p className="text-base">
                <strong>Tỉ lệ cạnh tranh:</strong> {job.levelStatus}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
