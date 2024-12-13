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
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-bold text-gray-800 line-clamp-2 min-h-[3.5rem] flex-1 mr-2">
              {job.jobTitle}
            </h2>
            {job.averageRating && (
              <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full text-sm">
                <FaStar className="text-yellow-400 text-xs" />
                <span className="font-semibold">{job.averageRating}</span>
              </div>
            )}
          </div>
          
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