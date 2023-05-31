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
import { useFetching } from "../../hooks/useFetching";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AddBook from "../../components/addBook/AddBook";

import "./books.scss";

export default function RecipeReviewCard() {
  const { fetchData } = useFetching();
  let [modal, setModal] = useState(false);
  const addRef = useRef<any>();

  const showModal = () => {
    addRef.current.classList.toggle("active");
    setModal(!modal);
  };

  useEffect(() => {
    const getAllBooks = async () => {
      const response = await fetchData({
        method: "GET",
        specialUrl: "/books",
      }).then((res) => res);
      console.log(response);
    };

    getAllBooks();
  }, []);

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
        <AddBook />
      </div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image="https://covers.openlibrary.org/b/id/12650311.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            This impressive paella is a perfect party dish and a fun meal to
            cook together with your guests. Add 1 cup of frozen peas along with
            the mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" style={{ background: "blue", color: "white" }}>
            Change status
          </Button>
          <Button size="small" style={{ background: "red", color: "white" }}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
