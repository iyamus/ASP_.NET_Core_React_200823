import axios, { AxiosResponse } from "axios";
import { IActivity } from "../models/activity";

axios.defaults.baseURL = "http://localhost:5000/api";

const responseBody = (res: AxiosResponse) => res.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(100)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(sleep(100)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(sleep(100)).then(responseBody),
  del: (url: string) => axios.delete(url).then(sleep(100)).then(responseBody),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  detail: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del(`/activities/${id}`),
};

export default { Activities };
