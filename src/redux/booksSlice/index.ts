import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { addBook, getBooks, signUp } from "./extraReducers";

export type Book = {
  author: string;
  cover: string;
  id: number;
  isbn: string;
  pages: number;
  published: number;
  title: string;
};

export type BooksDataType = {
  book: Book;
};

interface IInitialState {
  user: object;
  userLoading: boolean;
  books: BooksDataType[];
  booksLoading: boolean;
  bookData: object;
  bookStatus: string;
  bookDataLoading: boolean;
  error: string | undefined;
}

const initialState: IInitialState = {
  user: {},
  userLoading: true,

  books: {} as BooksDataType[],
  booksLoading: true,

  bookData: {},
  bookStatus: "",
  bookDataLoading: true,

  error: "",
};

const booksSlice = createSlice({
  name: "booksSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(signUp.rejected, (state, { error }) => {
        state.userLoading = false;
        state.error = error.message;
        console.log(error.message);
      });

    builder
      .addCase(getBooks.pending, (state) => {
        state.booksLoading = true;
        console.log("pending");
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.booksLoading = false;
        state.books = payload.data;
        console.log(payload);
      })
      .addCase(getBooks.rejected, (state, { error }) => {
        state.booksLoading = false;
        state.error = error.message;
        console.log(error.message);
      });

    builder
      .addCase(addBook.pending, (state) => {
        state.bookDataLoading = true;
      })
      .addCase(addBook.fulfilled, (state, { payload }) => {
        state.bookDataLoading = false;
        state.bookData = payload;
        state.bookStatus = "successful";
      })
      .addCase(addBook.rejected, (state, { error }) => {
        state.bookDataLoading = false;
        state.error = error.message;
      });
  },
});

export default booksSlice.reducer;

export const booksData = (state: RootState) => state.booksSlice;
