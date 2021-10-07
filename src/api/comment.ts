import { BASE_URL } from "./api.config";
const axios = require("axios").default;

export const createComment = async function (comment: any) {
  const response = await axios.post(`${BASE_URL}/comments`, comment);
  return response.data;
};

export const getAlertComments = async function (alertId: string) {
  const response = await axios(`${BASE_URL}/comments/alert/${alertId}`);
  return response.data;
};

export const getUserComments = async function (userId: string) {
  const response = await axios(`${BASE_URL}/comments/user/${userId}`);
  return response.data;
};
