import { JobPostAndDescription } from "@/lib/interface";
import Link from "next/link";
import React from "react";
import { FaBuilding, FaIndustry, FaStar, FaMapMarkerAlt, FaGraduationCap, FaMoneyBillWave, FaUsers, FaUserFriends, FaChartLine } from 'react-icons/fa';

export default function JobCard({ job }: { job: JobPostAndDescription }) {
  return (
    <Link href={`/recruitment/${job.postId}`}>
      <div
        key={job.postId}
        className="bg-white rounded-lg shadow hover:shadow-md transform hover:-translate-y-1 transition-all duration-300 overflow-hidden w-[250px]"
      >
        {/* Header Image */}
        <div className="relative h-36 overflow-hidden">
          <img
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
            src={"/images/0f2d9460-23d7-4870-bc2b-133ca46f5d29.webp"}
            alt="Job Post Image"
          />
          {job.averageRating && (
            <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 text-sm">
              <FaStar className="text-yellow-400 text-xs" />
              <span className="font-semibold">{job.averageRating}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 min-h-[3.5rem]">
            {job.jobTitle}
          </h2>

          <div className="space-y-2 text-sm">
            {job.companyName && (
              <div className="flex items-center gap-2 text-gray-600">
                <FaBuilding className="flex-shrink-0 text-blue-500 text-xs" />
                <span className="truncate">{job.companyName}</span>
              </div>
            )}

            {job.industry && (
              <div className="flex items-center gap-2 text-gray-600">
                <FaIndustry className="flex-shrink-0 text-blue-500 text-xs" />
                <span className="truncate">{job.industry}</span>
              </div>
            )}

            {job.location && (
              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="flex-shrink-0 text-blue-500 text-xs" />
                <span className="truncate">{job.location}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-gray-600">
              <FaGraduationCap className="flex-shrink-0 text-blue-500 text-xs" />
              <span className="truncate">{job.level}</span>
            </div>

            {job.salary && (
              <div className="flex items-center gap-2 text-gray-600">
                <FaMoneyBillWave className="flex-shrink-0 text-green-500 text-xs" />
                <span className="truncate">{job.salary}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between text-xs text-gray-500 border-t">
              {job.quantity && (
                <span className="flex items-center gap-1">
                  <FaUsers className="text-blue-500" />
                  {job.quantity}
                </span>
              )}
              {job.totalApplications && (
                <span className="flex items-center gap-1">
                  <FaUserFriends className="text-blue-500" />
                  {job.totalApplications}
                </span>
              )}
              {job.levelStatus && (
                <span className="flex items-center gap-1">
                  <FaChartLine className="text-blue-500" />
                  {job.levelStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}