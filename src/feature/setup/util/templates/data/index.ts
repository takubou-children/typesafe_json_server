import { apiGet, apiPost, apiPut } from "@/app/util/apiClient";

export const fetchTemplate = (name: string) => {
  try {
    apiGet(process.env.NEXT_PUBLIC_API_URL + name + "s");
  } catch (e) {
    console.log(e);
  }
};

export const createTemplate = (name: string, body: unknown) => {
  try {
    apiPost(process.env.NEXT_PUBLIC_API_URL + name + "s", body);
  } catch (e) {
    console.log(e);
  }
};

export const updateTemplate = (name: string, id: string, body: unknown) => {
  try {
    apiPut(process.env.NEXT_PUBLIC_API_URL + name + "s/" + id, body);
  } catch (e) {
    console.log(e);
  }
};
