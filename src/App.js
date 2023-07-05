import "./App.css";
import GymDetail from "./pages/GymDetail";
import Homepage from "./pages/Homepage";
import GymReview from "./pages/GymReview";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { Container, createTheme } from "@mui/material";
import GymLogin from "./pages/GymLogin";
import GymSignUp from "./pages/GymSignUp";
import AddGym from "./pages/AddGym";
import EditGym from "./pages/EditGym";
import store from "./redux/store";
import { loginSuccess } from "./redux/actions/authActions";
import { ThemeProvider } from "@emotion/react";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");
  if (user && token) {
    // Dispatch the loginSuccess action with the retrieved user and token
    store.dispatch(loginSuccess(user, token));
  }

  const theme = createTheme({
    typography: {
      fontFamily: [
        // '"Noto Sans"',
        // '"ヒラギノ角ゴ Pro W3"',
        // '"Hiragino Kaku Gothic Pro"',
        // 'Osaka',
        // 'メイリオ',
        // 'Meiryo',
        // '"ＭＳ Ｐゴシック"',
        // '"MS PGothic"',
        // '"ＭＳ ゴシック"',
        // '"MS Gothic"',
        '"Noto Sans CJK JP"',
        'TakaoPGothic',
        '"Source Han Sans"',
        'sans-serif'
      ].join(','),
    },
  });

  return (
    <Router>
      <ThemeProvider theme={theme} >
        <Container style={{ minHeight: "100vh", maxWidth: "1500px" }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/gym/:id" element={<GymDetail />} />
            <Route path="/gym/:id/review" element={<GymReview />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/create_gym" element={<AddGym />} />
            <Route path="/gym/:id/editgym" element={<EditGym />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<GymLogin />} />
            <Route path="/sign_up" element={<GymSignUp />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </Router>
  );
}

export default App;
