import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { auth } from "./firebase/firebase";
import GymsListScreen from "./screens/GymsListScreen";
import HereDetailScreen from "./screens/HereDetailScreen";
import HomeScreen from "./screens/HomeScreen";
import LogInScreen from "./screens/LoginScreen";
import SigninScreen from "./screens/SigninScreen";
import UserScreen from "./screens/UserScreen";

const theme = extendTheme({
  colors: {
    background: "#F0F0F2",
    whitegray: "#D7D7D9",
    lightgray: "#A6A6A6",
    menuBg: "#585859",
    headerBg: "#3F3F40",
  },
});

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  // uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signIn" element={<SigninScreen />} />
            <Route path="/logIn" element={<LogInScreen />} />
            <Route path="/detail" element={<HereDetailScreen />} />
            <Route path="/user" element={<UserScreen />} />
            <Route path="/gymsList" element={<GymsListScreen />} />
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
