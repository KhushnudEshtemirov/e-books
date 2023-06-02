import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
} from "@mui/material";

import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { addBook } from "../../redux/booksSlice/extraReducers";

type ModalPropsType = {
  showModal: () => void;
};

const AddBook = ({ showModal }: ModalPropsType) => {
  const dispatch = useAppDispatch();
  let [bookNumber, setBookNumber] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    dispatch(
      addBook({
        method: "POST",
        specialUrl: "/books",
        data: JSON.stringify({
          isbn: bookNumber,
        }),
      })
    );

    showModal();

    setBookNumber("");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar
          sx={{ m: 1, width: 80, height: 80 }}
          src="https://pngwebicons.com/uploads/book/512/book_icon6795.png"
          alt="add book"
          variant="square"
        />
        <Typography component="h1" variant="h5">
          Add New Book
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            margin="normal"
            required
            fullWidth
            id="bookNumber"
            label="Enter Book's ISBN"
            name="bookNumber"
            value={bookNumber}
            autoFocus
            onChange={(e) => setBookNumber(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Add to Shelf
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddBook;
