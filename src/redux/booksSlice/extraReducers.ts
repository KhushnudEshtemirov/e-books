import { createAsyncThunk } from "@reduxjs/toolkit";
import customAxios from "../../services/api/customAxios";

export type fetchProps = {
  method: string;
  specialUrl: string;
  data?: object | string;
  id?: number;
};

// Sign Up  Action
export const signUp = createAsyncThunk(
  "signUp",
  async (payload: fetchProps) => {
    return await customAxios({
      method: payload.method,
      url: payload.specialUrl,
      data: payload.data,
    }).then((res) => res.data);
  }
);

// Get All Books Action
export const getBooks = createAsyncThunk(
  "getBooks",
  async (payload: fetchProps) => {
    return await customAxios({
      method: payload.method,
      url: payload.specialUrl,
      data: payload.data,
    }).then((res) => res.data);
  }
);

// Add a New Book Action
export const addBook = createAsyncThunk(
  "addBook",
  async (payload: fetchProps) => {
    return await customAxios({
      method: payload.method,
      url: payload.specialUrl,
      data: payload.data,
    }).then((res) => res.data);
  }
);

// Remove a Book Action
export const removeBook = createAsyncThunk(
  "removeBook",
  async (payload: fetchProps) => {
    return await customAxios({
      method: payload.method,
      url: payload.specialUrl + "/" + payload.id,
      data: payload.data,
    }).then((res) => res.data);
  }
);

// Change Book's Status Action
export const changeStatusBook = createAsyncThunk(
  "changeStatusBook",
  async (payload: fetchProps) => {
    return await customAxios({
      method: payload.method,
      url: payload.specialUrl + "/" + payload.id,
      data: payload.data,
    }).then((res) => res.data);
  }
);
