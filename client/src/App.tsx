import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HereDetailScreen from "./screens/HereDetailScreen";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/detail" element={<HereDetailScreen />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
