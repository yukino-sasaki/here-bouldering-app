import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase";
import HereDetailScreen from "./screens/HereDetailScreen";
import HomeScreen from "./screens/HomeScreen";
import LogInScreen from "./screens/LoginScreen";
import SignInScreen from "./screens/SignInScreen";
import UserScreen from "./screens/UserScreen";

const initFirebaseAuth = () => {
  return new Promise((resolve) => {
    var unsubscribe = auth.onAuthStateChanged((user) => {
      // user オブジェクトを resolve
      resolve(user);

      // 登録解除
      unsubscribe();
    });
  });
};

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  await initFirebaseAuth();
  const token = await auth.currentUser?.getIdToken();
  console.log("user debug", token);

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
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
            <Route path="/user" element={<UserScreen />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
