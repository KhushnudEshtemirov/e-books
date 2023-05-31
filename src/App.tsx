import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage = lazy(() => import("./pages/homePage/HomePage"));
const SignUp = lazy(() => import("./pages/signUp/SignUp"));
const Books = lazy(() => import("./pages/books/Books"));

function App() {
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Suspense>
  );
}

export default App;
