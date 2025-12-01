import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER || "http://localhost:4000";
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;const MODULES_API = `${HTTP_SERVER}/api/modules`;
const axiosWithCredentials = axios.create({ 
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' }
});

export const findAllCourses = async () => {
  const response = await axios.get(COURSES_API);
  return response.data;
};

export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return response.data;
};

export const findCoursesForUser = async (userId: string) => {
  const response = await axios.get(`${USERS_API}/${userId}/courses`);
  return response.data;
};

export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return response.data;
};

export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}`);
  return response.data;
};

export const findUsersForCourse = async (courseId: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users`);
  return response.data;
};
// Enroll current user in a course
export const enrollInCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/current/courses/${courseId}`);
  return response.data;
};

// Unenroll current user from a course
export const unenrollFromCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/current/courses/${courseId}`);
  return response.data;
};

// Enroll a specific user in a course
export const enrollIntoCourse = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};

// Unenroll a specific user from a course
export const unenrollFromCourseAsUser = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${USERS_API}/${userId}/courses/${courseId}`);
  return response.data;
};
export const findModulesForCourse = async (courseId: string) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};
export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axios.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
export const deleteModule = async (courseId: string,moduleId: string) => {
 const response = await axios.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
 return response.data;
};

export const updateModule = async (courseId: string,module: any) => {
   const { data } = await axios.put(
   `${COURSES_API}/${courseId}/modules/${module._id}`,
   module
 );

  return data;
};
