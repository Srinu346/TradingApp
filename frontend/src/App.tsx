import { LandingPage } from "./pages/landingPage/landingPage"
import { LoginPage } from "./pages/auth/login";
import { RegisterPage } from "./pages/auth/register";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DashBoardPage } from "./pages/dashboard/dashboard";
import { ViewStock } from "./pages/stockView/ViewStock";
import { ViewMarket } from "./pages/market/ViewMarket";
import { Holdings } from "./pages/Holdings/holdings";
import { CustomProvider, Container } from 'rsuite';
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <UserProvider>
      <CustomProvider theme="light">
        <Container className="app">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/dashboard" element={<DashBoardPage />} />
              <Route path="/viewStock/:symbol" element={<ViewStock />} />
              <Route path="/viewMarket" element={<ViewMarket />} />
              <Route path="/holdings" element={<Holdings />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </CustomProvider>
    </UserProvider>
  );
}

export default App;
