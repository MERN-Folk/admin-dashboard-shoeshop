import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });
// For Auth token sever->middleware
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

// **** path same server->routes ****
export const logIn = (formData) => API.post("/login", formData);
export const regisTer = (formData) => API.post("/register", formData);
// Staff
export const getStaffs = () => API.get("/getStaffs");
export const changeStatus = (value) => API.post("/changeStatus", value);
export const changeRole = (value) => API.post("/changeRole", value);
export const removeStaff = (id) => API.delete(`/staffs/${id}`);
// Person
export const createPerson = (personData) => API.post("/createPerson", personData);
export const getPersons = () => API.get("/getPersons");
export const deletePerson = (id) => API.delete(`/person/${id}`);
export const updatePerson = (updatedPersonData, id) =>
  API.patch(`/person/${id}`, updatedPersonData);
export const getPersonsByStaff = (staffId) =>
  API.get(`/staffPersons/${staffId}`);  
export const getPersonsBySearch = (searchQuery) =>
API.get(`/search?searchQuery=${searchQuery}`)
// Cpro
export const createCpro = (cproData) => API.post("/createCpro", cproData);
export const getCpros = () => API.get("/getCpros");
export const deleteCpro = (id) => API.delete(`/cpro/${id}`);
export const updateCpro = (updatedCproData, id) =>
  API.patch(`/cpro/${id}`, updatedCproData);  
// Group
export const createGroup = (groupData) => API.post("/createGroup", groupData);
export const getGroups = () => API.get("/getGroups");
export const deleteGroup = (id) => API.delete(`/group/${id}`);
export const updateGroup = (updatedGroupData, id) =>
  API.patch(`/group/${id}`, updatedGroupData);