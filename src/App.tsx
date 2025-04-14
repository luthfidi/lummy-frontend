import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./pages/HomePage";
import { EventDetailPage } from "./pages/EventDetail";
import { CheckoutPage } from "./pages/Checkout";
import { MyTicketsPage } from "./pages/MyTickets";
import { MarketplacePage } from "./pages/Marketplace";

// Placeholder components for routes we haven't built yet

const EventsPage = () => (
  <Box p={8}>
    <h1>All Events Page (Coming Soon)</h1>
  </Box>
);

const ProfilePage = () => (
  <Box p={8}>
    <h1>Profile Page (Coming Soon)</h1>
  </Box>
);

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/checkout/:id" element={<CheckoutPage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/tickets" element={<MyTicketsPage />} />
          <Route path="/tickets/:id" element={<MyTicketsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
