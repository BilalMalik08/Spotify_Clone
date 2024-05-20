import { api } from "./api";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  const response = await fetch(api + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  const token = getToken();
  const response = await fetch(api + route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  let formattedResponse;
  try {
    formattedResponse = await response.json();
  } catch (error) {
    // Handle cases where the response is not JSON
    formattedResponse = { error: response.statusText };
  }

  return {
    status: response.status,
    data: formattedResponse,
  };
};

export const makeAuthenticatedGETRequest = async (route) => {
  const token = getToken();
  const response = await fetch(api + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

const getToken = () => {
  const accessToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  console.log("Retrieved Token:", accessToken);

  if (!accessToken) {
    console.error("Access token not found in cookies");
  }

  return accessToken;
};
