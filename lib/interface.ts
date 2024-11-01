import { number } from "zod";

export interface MenuItemType {
    id: string;
    title: string;
    url: string;
    extention: {
        urlIcon: string;
        titleIcon: string;
    }[]
}

export interface JobPost {
    id: string;
    urlLogo: string;
    title: string;
    titleCompany: string[];
    nameCompany: string;
    request: string[];
    salary: string;
    location: string[];
    locationDetail: string[];
    exp: string;
    interest: string[];
    working_time: string;
  }