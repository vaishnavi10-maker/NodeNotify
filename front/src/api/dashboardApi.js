import API from "./api";

export const getUser = () => API.get("/user/me");

export const getTasks = () => API.get("/tasks");
export const getProblems = () => API.get("/problems");

export const completeTask = (id) => API.patch(`/tasks/${id}`);
