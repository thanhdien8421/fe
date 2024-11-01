"use client";
import JobCard from "@/components/Folder Components/JobCard/JobCard";
import SearchBar from "@/components/Search/SearchBar";
import SwitchBtn from "@/components/switch/switchBtn";
import React from "react";
import { JobPosts } from "@/lib/data";
import { JobPost } from "@/lib/interface";

export default function JobPage() {
  let x: number = 0;
  return (
    <div className="pb-10">
      <div className=" mx-[15%]  pt-[60px]">
        <SearchBar></SearchBar>
      </div>
      <div>
        <SwitchBtn></SwitchBtn>
      </div>
      <div className="text-center mt-[50px] mx-[15%] gap-[30px]  grid lg:grid-cols-3 md:grid-cols-2">
        {JobPosts.map((post:JobPost)=>{return(<JobCard data={post} key={post.id}/>)})}
      </div>
    </div>
  );
};