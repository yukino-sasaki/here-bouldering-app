import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HereDetailScreen from "./screens/HereDetailScreen";
import HomeScreen from "./screens/HomeScreen";
import LogInScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signIn" element={<SignInScreen />} />
            <Route path="/logIn" element={<LogInScreen />} />
            <Route path="/detail" element={<HereDetailScreen />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
