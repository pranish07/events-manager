import React from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { EventDetails } from "./pages/EventDetails";
import { Home } from "./pages/Home";
export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/event/:eventId" element={<EventDetails />} />
      </Routes>
    </div>
  );
}
