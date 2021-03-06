import * as request from "./requester";
const authUrl = "http://localhost:3030/data";

export const getOne = (locationId) => {
  return fetch(`${authUrl}/locations/${locationId}`).then((res) => res.json());
};

export const getAllLocations = () => request.get(`${authUrl}/locations`);

export const createLocation = async (locationData, token) => {
  let response = await fetch(`${authUrl}/locations`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(locationData),
  });

  let result = await response.json();

  return result;
};

export const destroy = (locationId, token) => {
  return fetch(`${authUrl}/locations/${locationId}`, {
    method: "DELETE",
    headers: {
      "X-Authorization": token,
    },
  }).then((res) => res.json());
};

export const edit = (locationId, locationData) =>
  request.put(`${authUrl}/locations/${locationId}`, locationData);
