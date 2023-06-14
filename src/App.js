import "./App.css";
import GymDetail from "./pages/GymDetail";
import Homepage from "./pages/Homepage";
import GymReview from "./pages/GymReview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Container } from "@mui/material";
import AddGym from "./components/AddGym";
import EditGym from "./components/EditGym";

function App() {
  return (
    <Router>
      <Container style={{ minHeight: "100vh", maxWidth: "1500px" }}>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/gym/:id" element={<GymDetail />} />
          <Route path="/gym/:id/review" element={<GymReview />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/gym/:id/editgym" element={<EditGym />} />
          <Route path="/addgym" element={<AddGym />} />
        </Routes>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
