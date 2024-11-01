"use client";
import JobCard from "@/components/Folder Components/JobCard/JobCard";
import SearchBar from "@/components/Search/SearchBar";
import React from "react";
import { InfoJob } from "@/lib/data";
import { JobPost } from "@/lib/interface";
import Link from "next/link";

export default function JobPage() {
  return (
    <div className="pb-10">
      <div className=" mx-[15%]  pt-[60px]">
        <SearchBar></SearchBar>
      </div>

      <div className="text-center mt-[50px] mx-[12%] gap-[50px]  grid grid-cols-3 ">
        {
          InfoJob.map((job: JobPost) => <JobCard job = {job} key={job.id}/>)
        }
      </div>
    </div>
  );
};