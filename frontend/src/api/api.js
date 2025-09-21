import { axiosInstance } from "./axios";

// User Authentication APIs
export const signup = async (signupData) => {
  const response = await axiosInstance.post("/user/register", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/user/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get("/user/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/user/profile");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const updateProfile = async (userData) => {
  const response = await axiosInstance.post("/user/profile/update", userData);
  return response.data;
};

// Company APIs
export const registerCompany = async (companyData) => {
  const response = await axiosInstance.post("/company/register", companyData);
  return response.data;
};

export const getCompany = async () => {
  const response = await axiosInstance.get("/company/get");
  return response.data;
};

export const getCompanyById = async (companyId) => {
  const response = await axiosInstance.get(`/company/get/${companyId}`);
  return response.data;
};

export const updateCompany = async (companyId, companyData) => {
  const response = await axiosInstance.put(`/company/update/${companyId}`, companyData);
  return response.data;
};

// Job APIs
export const postJob = async (jobData) => {
  const response = await axiosInstance.post("/job/post", jobData);
  return response.data;
};

export const getAllJobs = async () => {
  const response = await axiosInstance.get("/job/get");
  return response.data;
};

export const getAdminJobs = async () => {
  const response = await axiosInstance.get("/job/getadminjobs");
  return response.data;
};

export const getJobById = async (jobId) => {
  const response = await axiosInstance.get(`/job/get/${jobId}`);
  return response.data;
};

// Application APIs
export const applyJob = async (jobId) => {
  const response = await axiosInstance.get(`/application/apply/${jobId}`);
  return response.data;
};

export const getAppliedJobs = async () => {
  const response = await axiosInstance.get("/application/get");
  return response.data;
};

export const getApplicants = async (jobId) => {
  const response = await axiosInstance.get(`/application/${jobId}/applicants`);
  return response.data;
};

export const updateApplicationStatus = async (applicationId, statusData) => {
  const response = await axiosInstance.post(`/application/status/${applicationId}/update`, statusData);
  return response.data;
};
