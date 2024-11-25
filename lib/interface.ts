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
