import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;

const axiosWithCredentials = axios.create({ 
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${courseId}`);
  return response.data;
};

export const getMyEnrollments = async () => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}/me`);
  return response.data;
};