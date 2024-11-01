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
    id: number;
    image: string;
    company: string;
    title: string;
    salary: string;
    destination: string;
    author: string;
    content: string;
  }