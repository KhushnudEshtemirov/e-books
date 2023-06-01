import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import Button from "@mui/material/Button";
import { useEffect, useState, useRef } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddBook from "../../components/addBook/AddBook";
import { useSelector, useDispatch } from "react-redux";

import "./books.scss";
import { BooksDataType, booksData } from "../../redux/booksSlice";
import {
  changeStatusBook,
  fetchProps,
  getBooks,
  removeBook,
} from "../../redux/booksSlice/extraReducers";
import { useAppDispatch } from "../../hooks";

const user1 = require("../../assets/images/authors/1.jpeg");
const user2 = require("../../assets/images/authors/2.jpeg");
const user3 = require("../../assets/images/authors/3.jpeg");
const user4 = require("../../assets/images/authors/4.jpeg");
const user5 = require("../../assets/images/authors/5.jpeg");
const user6 = require("../../assets/images/authors/6.jpeg");
const user7 = require("../../assets/images/authors/7.jpeg");
const user8 = require("../../assets/images/authors/8.jpeg");
const user9 = require("../../assets/images/authors/9.jpeg");
const user10 = require("../../assets/images/authors/10.jpeg");

export default function RecipeReviewCard() {
  const { books, booksLoading, addBookStatus, removeBookStatus, bookStatus } =
    useSelector(booksData);
  const dispatch = useAppDispatch();
  const images = [
    user1,
    user2,
    user3,
    user4,
    user5,
    user6,
    user7,
    user8,
    user9,
    user10,
  ];

  const booksImages = [
    "https://i.ibb.co/7pFCC2Z/18.png",
    "https://i.ibb.co/L5MwSKK/17.png",
    "https://i.ibb.co/g3FS11t/16.png",
    "https://i.ibb.co/Wz8FbLg/15.png",
    "https://i.ibb.co/Db0rZgd/14.png",
    "https://i.ibb.co/ZfH56zQ/13.png",
    "https://i.ibb.co/8DfZL8J/11.png",
    "https://i.ibb.co/c6Fc3ML/12.png",
    "https://i.ibb.co/WpGDnVP/10.png",
    "https://i.ibb.co/7tWsy3r/9.png",
    "https://i.ibb.co/LNvwZ0Z/8.png",
    "https://i.ibb.co/kHxH3GN/7.png",
  ];

  let [modal, setModal] = useState(false);
  const addRef = useRef<any>();

  const showModal = () => {
    addRef.current.classList.toggle("active");
    setModal(!modal);
  };

  useEffect(() => {
    const payloadData: fetchProps = {
      method: "GET",
      specialUrl: "/books",
      data: {},
    };
    dispatch(getBooks(payloadData));
  }, []);

  useEffect(() => {
    if (addBookStatus || removeBookStatus || bookStatus) {
      const payloadData: fetchProps = {
        method: "GET",
        specialUrl: "/books",
        data: {},
      };
      dispatch(getBooks(payloadData));
    }
  }, [addBookStatus, removeBookStatus, bookStatus]);

  if (booksLoading) {
    return <p>loading...</p>;
  }

  const handleRemove = (id: number) => {
    const payloadData: fetchProps = {
      method: "DELETE",
      specialUrl: "/books",
      data: {},
      id: id,
    };
    dispatch(removeBook(payloadData));
  };

  const handleChangeBook = (id: number) => {
    const payloadData: fetchProps = {
      method: "PATCH",
      specialUrl: "/books",
      data: JSON.stringify({ status: 3 }),
      id: id,
    };
    dispatch(changeStatusBook(payloadData));
  };

  console.log(books);

  return (
    <div className="all-books">
      <Fab
        ref={addRef}
        color="primary"
        aria-label="add"
        className="add-icon"
        title="Add New Book"
        onClick={showModal}
      >
        <AddIcon />
      </Fab>
      <div className={`modal-window ${modal ? "show-modal" : ""}`}>
        <AddBook showModal={showModal} />
      </div>
      {books ? (
        books?.map((book: BooksDataType) => (
          <Card sx={{ maxWidth: 345 }} key={book.book.id}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  <img
                    style={{ width: "100%" }}
                    src={images[Math.floor(Math.random() * 10)]}
                    alt="author"
                  />
                </Avatar>
              }
              title={book.book.author}
              subheader={book.book.published + " year"}
            />
            <CardMedia
              component="img"
              height="300"
              image={booksImages[Math.floor(Math.random() * 10)]}
              alt="Paella dish"
              sx={{ objectFit: "fill" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {book.book.title}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                style={{ background: "blue", color: "white" }}
                onClick={() => handleChangeBook(book.book.id)}
              >
                Change status
              </Button>
              <Button
                size="small"
                style={{ background: "red", color: "white" }}
                onClick={() => handleRemove(book.book.id)}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))
      ) : (
        <p>hozirda sizda kitob mavjud emas</p>
      )}
    </div>
  );
}
