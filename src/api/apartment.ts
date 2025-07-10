import axios from "axios";
import type { IApartment, IApartmentResponse } from "../App";

export const createApartment = async (apartment: IApartment) => {
  const response = await axios.post(
    "http://localhost:8000/api/v1/apartment",
    apartment
  );

  if (!response.status) {
    throw new Error("Failed to create apartment");
  }
};

export const getApartmentList = async () => {
  const response = await axios.get<IApartmentResponse[]>(
    "http://localhost:8000/api/v1/apartment"
  );

  if (!response.status) {
    throw new Error("Failed to create apartment");
  }

  return response.data;
};

export const deleteApartment = async (id: string) => {
  const response = await axios.delete(
    `http://localhost:8000/api/v1/apartment/${id}`
  );

  if (!response.status) {
    throw new Error("Failed to create apartment");
  }

  return response.data;
};
