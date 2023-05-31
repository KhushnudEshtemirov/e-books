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
import { useFetching } from "../../hooks/useFetching";

const AddBook = () => {
  let [bookNumber, setBookNumber] = useState("");
  const { fetchData, response } = useFetching();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    fetchData({
      method: "POST",
      specialUrl: "/books",
      data: {
        isbn: bookNumber.toString(),
      },
    });
  };

  console.log(response);

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
