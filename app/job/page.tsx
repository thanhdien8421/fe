"use client";
import JobCard from "@/components/JobCard/JobCard";
import SearchBar from "@/components/Search/SearchBar";
import React, { useEffect } from "react";
import { InfoJob } from "@/lib/data";
import { JobPost } from "@/lib/interface";
import { useState } from "react";
import { useAppSelector } from '@/hooks';
import { selectTag } from '@/hooks/slices/useTag';

export default function JobPage() {
  const [keyword, changeKeyword] = useState<string>("")
  const [filter, setFilter] = useState<JobPost[]>(InfoJob)
  const tag = useAppSelector(selectTag)
  useEffect(() => {
    setFilter(() => InfoJob.filter((e: JobPost) => e.title.toLowerCase().includes(keyword) && (e.location.includes(tag) || tag === "")))
  }, [keyword, tag])
  return (
    <div className="pb-10">
      <div className=" mx-[15%]  pt-[60px] z-0">
        <SearchBar changeKeyword={changeKeyword} />
        <p>{keyword}</p>
      </div>
      <p>{tag}</p>
      <div className="text-center mt-[50px] mx-[12%] gap-[50px]  grid grid-cols-3 z-0">
        {
          filter.map((job: JobPost) => <JobCard job={job} key={job.id} />)
        }
      </div>
    </div>
  );
};