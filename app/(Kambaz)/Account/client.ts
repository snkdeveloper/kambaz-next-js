import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_HTTP_SERVER 
  ? `${process.env.NEXT_PUBLIC_HTTP_SERVER}/api`
  : "http://localhost:4000/api";

axios.defaults.withCredentials = true;
export const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
export const USERS_API = `${API_BASE}/users`;
console.log("🌐 API Base URL:", API_BASE);
const axiosWithCredentials = axios.create({ withCredentials: true });

export const signup = async (user: any) => {
  const response = await axios.post(`${API_BASE}/users/signup`, user);
  return response.data;
};

export const signin = async (credentials: any) => {
  const response = await axios.post(`${API_BASE}/users/signin`, credentials);
  return response.data;
};

export const profile = async () => {
  const response = await axios.post(`${API_BASE}/users/profile`);
  return response.data;
};



export const signout = async () => {
  const response = await axios.post(`${API_BASE}/users/signout`);
  return response.data;
};

// Optional: Add these if you need them for your People/Users functionality
export const findAllUsers = async () => {
  const response = await axiosWithCredentials.get(`${API_BASE}/users`);
  return response.data;
};







export const findUsersByRole = async (role: string) => {
  const response = await
    axios.get(`${USERS_API}?role=${role}`);
  return response.data;
};

export const findUsersByPartialName = async (name: string) => {
  const response = await axios.get(`${USERS_API}?name=${name}`);
  return response.data;
};
export const findUserById = async (id: string) => {
  const response = await axios.get(`${USERS_API}/${id}`);
  return response.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axios.delete( `${USERS_API}/${userId}` );
  return response.data;
};
export const updateUser = async (user: any) => {
  const response = await axiosWithCredentials.put(`${USERS_API}/${user._id}`, user);
  return response.data;
};

export const createUser = async (user: any) => {
  const response = await axios.post(`${USERS_API}`, user);
  return response.data;
};



