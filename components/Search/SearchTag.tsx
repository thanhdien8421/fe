"use client"
import { Checkbox } from "@/components/ui/checkbox"
import React, { useState } from 'react'
import { CiCircleList } from "react-icons/ci";
import { IoChevronForwardOutline } from "react-icons/io5";
const SearchTag = () => {

  const career_directory = [
    {
      occupational_group: "Công nghệ thông tin",
      profession: [
        {
          name: "Software Engineering",
          specializes: [
            "Software Engineer",
            "Backend Developer",
            "Frontend Developer",
            "Mobile Developer",
            "Fullstack Developer",
            "Blockchain Developer",
          ]
        },
        {
          name: "Software Testing",
          specializes: [
            "Software Tester (Automation & Manual)",
            "Automation Tester",
            "Manual Tester",
            "Game Tester",
            "QA Engineer",
          ]
        },
        {
          name: "Artificial Intelligence (AI)",
          specializes: [
            "AI Engineer",
            "AI Researcher",
            "Data Labeling (Gán nhãn dữ liệu)",

          ]
        },
        {
          name: "Software Design",
          specializes: [
            "UI/UX Design",
            "Grapic Design/Ilustration/Animation",
            "Interaction Designer",

          ]
        },
        {
          name: "Product Management",
          specializes: [
            "Product Owner/Product Manager",
            "Business Analyst (Phân tích nghiệp vụ)",
            "Product Analyst/Research",
          ]
        },
        {
          name: "Game Developer",
          specializes: [
            "Game Developer",
            "Concept Artist",
            "Game Design",
            "AR/VR Developer",
          ]
        }
      ]

    },
    {
      occupational_group: "Marketing/ PR/ Quảng cáo",
      profession: [

        {
          name: "Software Testing",
          specializes: [
            "Software Tester (Automation & Manual)",
            "Automation Tester",
            "Manual Tester",
            "Game Tester",
            "QA Engineer",
          ]
        },
        {
          name: "Artificial Intelligence (AI)",
          specializes: [
            "AI Engineer",
            "AI Researcher",
            "Data Labeling (Gán nhãn dữ liệu)",

          ]
        },
        {
          name: "Software Design",
          specializes: [
            "UI/UX Design",
            "Grapic Design/Ilustration/Animation",
            "Interaction Designer",

          ]
        },
        {
          name: "Product Management",
          specializes: [
            "Product Owner/Product Manager",
            "Business Analyst (Phân tích nghiệp vụ)",
            "Product Analyst/Research",
          ]
        },
        {
          name: "Game Developer",
          specializes: [
            "Game Developer",
            "Concept Artist",
            "Game Design",
            "AR/VR Developer",
          ]
        }
      ]

    },
    {
      occupational_group: "Dịch vụ khách hàng/ Văn hành",
      profession: [
        {
          name: "Software Engineering",
          specializes: [
            "Software Engineer",
            "Backend Developer",
            "Frontend Developer",
            "Mobile Developer",
            "Fullstack Developer",
            "Blockchain Developer",
          ]
        },

        {
          name: "Artificial Intelligence (AI)",
          specializes: [
            "AI Engineer",
            "AI Researcher",
            "Data Labeling (Gán nhãn dữ liệu)",

          ]
        },
        {
          name: "Software Design",
          specializes: [
            "UI/UX Design",
            "Grapic Design/Ilustration/Animation",
            "Interaction Designer",

          ]
        },
        {
          name: "Product Management",
          specializes: [
            "Product Owner/Product Manager",
            "Business Analyst (Phân tích nghiệp vụ)",
            "Product Analyst/Research",
          ]
        },
        {
          name: "Game Developer",
          specializes: [
            "Game Developer",
            "Concept Artist",
            "Game Design",
            "AR/VR Developer",
          ]
        }
      ]

    },
    {
      occupational_group: "Tài chính/Ngân hàng/ Bảo hiểm",
      profession: [
        {
          name: "Software Engineering",
          specializes: [
            "Software Engineer",
            "Backend Developer",
            "Frontend Developer",
            "Mobile Developer",
            "Fullstack Developer",
            "Blockchain Developer",
          ]
        },
        {
          name: "Software Testing",
          specializes: [
            "Software Tester (Automation & Manual)",
            "Automation Tester",
            "Manual Tester",
            "Game Tester",
            "QA Engineer",
          ]
        },

        {
          name: "Software Design",
          specializes: [
            "UI/UX Design",
            "Grapic Design/Ilustration/Animation",
            "Interaction Designer",

          ]
        },
        {
          name: "Product Management",
          specializes: [
            "Product Owner/Product Manager",
            "Business Analyst (Phân tích nghiệp vụ)",
            "Product Analyst/Research",
          ]
        },
        {
          name: "Game Developer",
          specializes: [
            "Game Developer",
            "Concept Artist",
            "Game Design",
            "AR/VR Developer",
          ]
        }
      ]
    }
  ]
  const [occupational, setOccupational] = useState(1);
  const [activeCategory, setActiveCategory] = useState(null);
  const handleCategoryHover = (index: any) => {
    setActiveCategory(index);
  };
  const [open, setOpen] = useState(false);
  return (


    <div className="relative bg-white">
      <div className='flex p-2 border border-gray-600 bg-white rounded-md w-[200px]' onClick={() => (setOpen(!open))}>
        <CiCircleList size={30} />
        <p className='ml-2 text-[1.1rem]  '>  Danh mục nghề</p>
      </div>
      <ul className={`flex rounded-sm w-auto absolute ${open ? "max-h-[300px] min-h-[300px] p-6 border bg-white border-gray-600" : "max-h-0"} `}>
        <div className="overflow-y-auto   max-h-[300px]">
          {career_directory.map((career, index) => {
            return (
              <li key={index} className="flex justify-between mt-1 mr-2 mb-6 max-w-[300px] "
                onMouseEnter={() => handleCategoryHover(index)}
              >
                <span>{career.occupational_group}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7">
                  </path>
                </svg>
              </li>
            )
          })}
        </div>
        <div className="overflow-y-auto  max-h-[300px]">
          {activeCategory !== null && (career_directory[activeCategory].profession.map((profession: any) => {
            return (
              <Specialization profession={profession} />
            )
          }))}
        </div>
      </ul>
    </div>

  )

}
export default SearchTag

export function Specialization({ profession }: { profession: any }) {
  return (
    <div className="flex flex-row border-b border-gray-300 bg-white">

      <div className="text-[1rem] w-[200px] max-w-[200px] mt-2 flex flex-row bg-white">
        <Checkbox className="m-1 bg-white" />
        <p>{profession.name}</p>
      </div>
      <div className=" max-w-[500px] bg-white">
        {profession.specializes.map((tag: any) => {
          return (
            <button className="text-gray-700 bg-slate-300 m-2 text-center rounded-[15px] text-[15px] w-max pt-1 pb-1 pl-2 pr-1">{tag}</button>
          )
        })}
      </div>
    </div>
  )
}
