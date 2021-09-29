import { BASE_URL } from "./api.config";

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
    const response = await fetch(`${BASE_URL}/alerts/${id}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(response.statusText);
      }
    }
    const alertFromDb = await response.json();
    return alertFromDb;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const getAlerts = async function () {
  try {
    const response = await fetch(`${BASE_URL}/alerts`);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    const alertFromDbs = await response.json();
    return alertFromDbs;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

// export const searchAlerts = async function (query: string) {
//   try {
//     const response = await fetch(`${BASE_URL}/alerts/search?query=${query}`);
//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }
//     const alertFromDbs = await response.json();
//     return alertFromDbs;
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     }
//   }
// };
