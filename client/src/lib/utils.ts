import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from 'axios'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const getAccessToken = async (): Promise<string> => {
  const response = await axios.get('/api/getcookie');
  const access_token = response?.data?.UserAuth?.access_token;

  return access_token ? access_token : "";
};