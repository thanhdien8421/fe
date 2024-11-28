"use client";
import JobCard from "@/components/Common/JobCard";
import SearchBar from "@/components/Search/SearchBar";
import React, { useEffect } from "react";
import { InfoJob } from "@/lib/data";
import { JobCardData } from "@/lib/interface";
import { useState } from "react";
import { useAppSelector } from "@/hooks";
import { selectTag } from "@/hooks/slices/useTag";

export default function JobPage() {
  let resultdata = InfoJob
  const [keyword, changeKeyword] = useState<string>("");
  const [filter, setFilter] = useState<any>(InfoJob);
  const tag = useAppSelector(selectTag);
  useEffect(() => {
    setFilter(() =>
      InfoJob.filter(
        (e: any) =>
          e.title.toLowerCase().includes(keyword) &&
          (e.location.includes(tag) || tag === "")
      )
    );
  }, [keyword, tag]);
  return (
    <div className="pb-10">
      <div className=" mx-[10%]  pt-[60px] z-50 relative">
        <SearchBar changeKeyword={changeKeyword}/>
      </div>
      <div className="text-center mt-[50px] mx-[12%] gap-[50px]  grid grid-cols-3 z-0 relative">
        {filter.map((job: JobCardData) => (
          <JobCard job={job} key={job.id} />
        ))}
      </div>
    </div>
  );
}
