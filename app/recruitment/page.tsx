"use client";
import JobCard from "@/components/Folder Components/JobCard/JobCard";
import SearchBar from "@/components/Search/SearchBar";
import SearchInput from "@/components/SearchInput/SearchInput";
import SwitchBtn from "@/components/switch/switchBtn";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import React, { useEffect, useRef, useState } from "react";
import { FcSearch } from "react-icons/fc";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoLocationOutline, IoSearchSharp } from "react-icons/io5";
import { RiMapPin2Line } from "react-icons/ri";
import { TfiTime } from "react-icons/tfi";

function ResuitmentPage() {
  let Hd = `Mỗi mô tả cần bắt đầu bằng dấu "-"
  - Mô tả 1
  - Mô tả 2
  `;
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptitonRef = useRef<HTMLTextAreaElement>(null);
  const addresssRef = useRef<HTMLSelectElement>(null);
  const maxSalary = useRef<HTMLInputElement>(null);
  const minSalary = useRef<HTMLInputElement>(null);
  const experienceRef = useRef<HTMLSelectElement>(null);
  const requireRef = useRef<HTMLTextAreaElement>(null);

  const offerRef = useRef<HTMLTextAreaElement>(null);
  const timeWorkRef = useRef<HTMLTextAreaElement>(null);
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  let handleError = (message: any) => {
    const paragraph = document.getElementById("myParagraph");
    if (paragraph) paragraph.innerHTML = message;
  };
  let handleCreated = () => {
    if (
      titleRef.current?.value.length == 0 ||
      descriptitonRef.current?.value.length == 0 ||
      addresssRef.current?.value.length == 0 ||
      requireRef.current?.value.length == 0 ||
      minSalary.current?.value.length == 0 ||
      offerRef.current?.value.length == 0 ||
      timeWorkRef.current?.value.length == 0 ||
      minSalary.current?.value.length == 0 ||
      maxSalary.current?.value.length == 0 ||
      experienceRef.current?.value.length == 0 ||
      startRef.current?.value.length == 0 ||
      endRef.current?.value.length == 0
    )
      handleError("Vui lòng nhập đủ thông tin");
    else {
      if (Number(minSalary.current?.value) > Number(maxSalary.current?.value)) {
        handleError("Mức lương tối thiểu phải nhỏ hơn mức lương tối đa");
        return;
      }
      if (
        new Date(`${startRef.current?.value}`).getTime() >
        new Date(`${endRef.current?.value}`).getTime()
      ) {
        handleError("Ngày bắt đầu phải trước ngày kết thúc");
      }
      let dtoBĐ = {
        title: "",
        experienc: "",
        minSalary: "",
        maxSalary: "",
        address: "",
        description: "",
        require: "",
        offer: "",
        timeWork: "",
        start: "",
        end: "",
      };

      //@ts-ignore
      dtoBĐ.title = titleRef.current?.value;
      //@ts-ignore
      dtoBĐ.description = descriptitonRef.current?.value;
      //@ts-ignore
      dtoBĐ.address = addresssRef.current?.value;
      //@ts-ignore
      dtoBĐ.require = requireRef.current?.value;
      //@ts-ignore
      dtoBĐ.minSalary = Number(minSalary.current?.value);
      //@ts-ignore
      dtoBĐ.offer = offerRef.current?.value;
      //@ts-ignore
      dtoBĐ.timeWork = timeWorkRef.current?.value;
      //@ts-ignore
      dtoBĐ.maxSalary = Number(maxSalary.current?.value);
      //@ts-ignore
      dtoBĐ.experience = experienceRef.current?.value;
      //@ts-ignore
      dtoBĐ.start = startRef.current?.value;
      //@ts-ignore
      dtoBĐ.end = endRef.current?.value;
      console.log(dtoBĐ);
      // gửi dữ liệu đến server
      //...
      handleError("");
      // đóng dialog
    }
    //@ts-ignore
  };
  let [listExperience] = React.useState<any>([
    {
      value: "Không yêu cầu kinh nghiệm",
    },
    {
      value: "Dưới 1 năm",
    },
    {
      value: "Trên 1 năm",
    },
    {
      value: "Trên 2 năm",
    },
    {
      value: "Trên 3 năm",
    },
    {
      value: "Trên 4 năm",
    },
    {
      value: "Trên 5 năm",
    },
  ]);
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
    "Mộc Châu", // Lặp lại để hoàn thành 64 nếu cần
  ];

  const Body = () => {
    return (
      <div className="mx-[18%] mt-20 px-14 py-10  bg-white">
        <div className=" text-xl">Vị trí tuyển dụng</div>
        <textarea
          ref={titleRef}
          placeholder="Nhập tiêu đề của bài tuyển dụng"
          className="mt-3 flex min-h-[60px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        />

        <div className="flex mt-3 text-lg h-[120px] ">
          <div className="flex flex-row mt-3   ">
            <div className="flex mt-1 flex-col   ">
              <div> Kinh Nghiệm </div>
              <select
                id="selection"
                className="border p-1 rounded-md"
                ref={experienceRef}
              >
                {listExperience.map((item: any, index: any) => {
                  return (
                    <option value={item.value} key={index} id={item.value}>
                      {item.value}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex flex-row  mt-3 ">
            <div className="flex mt-1 flex-col  mx-14">
              <div>Lương ( Triệu )</div>
              <div className="flex flex-row">
                <input
                  type="number"
                  id="minSalary"
                  name="minSalary"
                  required
                  className="border rounded-md w-[50px] pl-2 mr-5"
                  min={0}
                  defaultValue={0}
                  ref={minSalary}
                />
                <p>Tới</p>
                <input
                  type="number"
                  id="minSalary"
                  name="minSalary"
                  required
                  className="border rounded-md w-[50px] pl-2 ml-5"
                  min={0}
                  defaultValue={0}
                  ref={maxSalary}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row  mt-3 ">
            <div className="flex mt-1 flex-col ml-4 ">
              <div>Địa điểm</div>
              <select
                id="selection"
                className="border p-1 rounded-md "
                ref={addresssRef}
              >
                {provincesAndCities.map((item: any, index: any) => {
                  return (
                    <option value={item} key={index} id={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>

        <div className="mt-5 text-xl">Mô tả công việc</div>
        <textarea
          ref={descriptitonRef}
          placeholder={Hd}
          className="mt-3 flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        />

        <div className="mt-5 text-xl">Yêu cầu ứng viên</div>
        <textarea
          ref={requireRef}
          placeholder={Hd}
          className="mt-3 flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        />

        <div className="mt-5 text-xl">Quyền lợi</div>
        <textarea
          ref={offerRef}
          placeholder={Hd}
          className="mt-3 flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        />

        <div className="mt-5 text-xl">Thời gian làm việc</div>
        <textarea
          ref={timeWorkRef}
          placeholder={Hd}
          className="mt-3 flex min-h-[100px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
        />
        <div className="mt-5 text-xl">
          Thời gian bắt đầu :{" "}
          <input
            type="date"
            name="date"
            id=""
            className="border-2 rounded-sm px-2 ml-2"
            ref={startRef}
          />
        </div>
        <div className="mt-5 text-xl">
          Thời gian kết thúc :{" "}
          <input
            type="date"
            name="date"
            id=""
            className="border-2 rounded-sm px-2 ml-2"
            ref={endRef}
          />
        </div>
        <button
          className="bg-[#00b14f] mt-10 rounded-[7px] p-[7px] font-semibold text-white hover:bg-green-600"
          onClick={handleCreated}
        >
          Tạo bài tuyển dụng
        </button>
        <p id="myParagraph"></p>
      </div>
    );
  };
  return (
    <div className="bg-[#f4f5f5] pt-10 pb-20">
      <Body></Body>
      <div className="mt-[20px] "></div>
    </div>
  );
}

export default ResuitmentPage;
