import "./App.css";
import GymDetail from "./pages/GymDetail";
import Homepage from "./pages/Homepage";
import GymReview from "./pages/GymReview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Container } from "@mui/material";
import GymLogin from "./pages/GymLogin";
import GymSignUp from "./pages/GymSignUp";
import AddGym from "./pages/AddGym";
import store from "./redux/store";
import { loginSuccess } from "./redux/actions/authActions";

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');
  if (user && token) {
    // Dispatch the loginSuccess action with the retrieved user and token
    store.dispatch(loginSuccess(user, token));
  }
  return (

    <Router>
      <Container style={{ minHeight: '100vh', maxWidth: '1500px' }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/gym/:id" element={<GymDetail />} />
          <Route path="/gym/:id/review" element={<GymReview />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/create_gym" element={<AddGym />}/>
        </Routes>
        <Routes>
          <Route path="/login" element={<GymLogin />} />
          <Route path="/sign_up" element={<GymSignUp />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
