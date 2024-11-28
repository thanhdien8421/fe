import { number } from "zod";

export interface MenuItemType {
  id: string;
  title: string;
  url: string;
  extention: {
    urlIcon: string;
    titleIcon: string;
  }[];
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
  id: number;
  title: string;
  description: string;
  datePosted: string;
  deadline: string;
  location: string;
  experience: string;
  level: string;
  salary: string;
  quantity: string;
  employmentType: string;
  gender: string;
}
