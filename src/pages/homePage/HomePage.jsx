import { Link } from "react-router-dom";

import "./homePage.scss";

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to the biggest online library!</h1>
      <Link to="/books">SEE ALL BOOKS</Link>
    </div>
  );
};

export default HomePage;
