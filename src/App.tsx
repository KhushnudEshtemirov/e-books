import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loader from "./components/loader/Loader";
import { useSelector } from "react-redux";
import { booksData } from "./redux/booksSlice";

const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const SignUp = lazy(() => import("./pages/signUp/SignUp"));
const Books = lazy(() => import("./pages/books/Books"));

function App() {
  const { user } = useSelector(booksData);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {user.isOk ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/books" element={<Books />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/sign-up" />} />
          </>
        )}
      </Routes>
    </Suspense>
  );
}

export default App;
