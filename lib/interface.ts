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
    company: string;
    title: string;
    author: string;
    content: string;
  }