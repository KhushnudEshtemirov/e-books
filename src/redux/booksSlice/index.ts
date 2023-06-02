import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  addBook,
  changeStatusBook,
  getBooks,
  removeBook,
  signUp,
} from "./extraReducers";

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
  status: number;
};

type UserType = {
  data: object;
  isOk: boolean;
  message: string;
};

interface IInitialState {
  user: UserType;
  userLoading: boolean;

  books: BooksDataType[];
  booksLoading: boolean;

  addBookStatus: string | null;
  bookDataLoading: boolean;

  removeBookLoading: boolean;
  removeBookStatus: string | null;

  bookStatusLoading: boolean;
  bookStatus: string | null;

  error: string | undefined;
}

const initialState: IInitialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") || "{}")
    : ({} as UserType),
  userLoading: true,

  books: {} as BooksDataType[],
  booksLoading: true,

  addBookStatus: "",
  bookDataLoading: true,

  removeBookLoading: true,
  removeBookStatus: "",

  bookStatusLoading: true,
  bookStatus: "",

  error: "",
};

const booksSlice = createSlice({
  name: "booksSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Sign Up
    builder
      .addCase(signUp.pending, (state) => {
        state.userLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.userLoading = false;
        state.user = payload;
        localStorage.setItem("user", JSON.stringify(payload));
      })
      .addCase(signUp.rejected, (state, { error }) => {
        state.userLoading = false;
        state.error = error.message;
      });

    builder
      .addCase(getBooks.pending, (state) => {
        state.booksLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.booksLoading = false;
        state.books = payload.data;
      })
      .addCase(getBooks.rejected, (state, { error }) => {
        state.booksLoading = false;
        state.error = error.message;
      });

    // Add new Book
    builder
      .addCase(addBook.pending, (state) => {
        state.bookDataLoading = true;
        state.addBookStatus = "";
      })
      .addCase(addBook.fulfilled, (state, { payload }) => {
        state.bookDataLoading = false;
        state.addBookStatus = "successful";
      })
      .addCase(addBook.rejected, (state, { error }) => {
        state.bookDataLoading = false;
        state.error = error.message;
        state.addBookStatus = null;
      });

    // Remove Book
    builder
      .addCase(removeBook.pending, (state) => {
        state.removeBookLoading = true;
        state.removeBookStatus = "";
      })
      .addCase(removeBook.fulfilled, (state, { payload }) => {
        state.removeBookLoading = false;
        state.removeBookStatus = "successful";
      })
      .addCase(removeBook.rejected, (state, { error }) => {
        state.removeBookLoading = false;
        state.removeBookStatus = null;
        state.error = error.message;
      });

    // Change Book Status
    builder
      .addCase(changeStatusBook.pending, (state) => {
        state.bookStatusLoading = true;
        state.bookStatus = "";
      })
      .addCase(changeStatusBook.fulfilled, (state, { payload }) => {
        state.bookStatusLoading = false;
        state.bookStatus = "successful";
      })
      .addCase(changeStatusBook.rejected, (state, { error }) => {
        state.bookStatusLoading = false;
        state.bookStatus = null;
        state.error = error.message;
      });
  },
});

export default booksSlice.reducer;

export const booksData = (state: RootState) => state.booksSlice;
