import { Routes, Route } from "react-router-dom";
import { Home, Checkout } from "./pages";
import { AppHeader } from "./components";
import {
  Container,
} from "@mantine/core";

export default function App() {
  return (
    <div className="App">
      {/* <AppHeader /> */}
      <Container size="md" padding="md">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route
            path="*"
            element={<h1>Page Not Found</h1>}
          />
        </Routes>
      </Container>
    </div>
  );
}
