import { BASE_URL } from "./api.config";
const axios = require("axios").default;

export const createAlert = async function (alert: any) {
  const response = await fetch(`${BASE_URL}/alerts`, {
    method: "POST",
    body: alert,
  });
  if (!response.ok) {
    let errorMessage = await response.json();
    throw new Error(errorMessage.message);
  }
  const alertFromDb = await response.json();
  return alertFromDb;
};

export const getAlert = async function (id: string) {
  try {
    const response = await axios(`${BASE_URL}/alerts/${id}`);
    return response.data[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getAlerts = async function () {
  try {
    const response = await axios(`${BASE_URL}/alerts`);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getUserAlerts = async function (owner: any) {
  try {
    const response = await axios.post(`${BASE_URL}/alerts/user`, owner);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
