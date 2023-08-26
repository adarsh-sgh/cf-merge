import { DEV, PROD } from "../config";
const API = process.env.NODE_ENV === "production" ? PROD.API : DEV.API;
console.log(API);
type Response = {
  url: string;
  short: string;
  expiry: number;
  rate_limit: number;
  rate_limit_reset: number;
};
export const getMergedLinks = async (links: string[]) => {
  const url = links.join(",");
  // no cors;
  console.log(url);
  const body = JSON.stringify({ url });
  console.log(body);
  const res = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  const data = await res.json();
  console.log(data);
  return data as Response;
};
