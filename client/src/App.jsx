import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Join } from "./pages/Join";
import { Main } from "./pages/Main";
import { Header } from "./components/Header";
import { DefaultLayout } from "./layout/DefaultLayout";
import { Login } from "./pages/Login";

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route
            path="/"
            element={
              <DefaultLayout>
                <Main />
              </DefaultLayout>
            }></Route>
          <Route
            path="/login"
            element={
              <DefaultLayout>
                <Login />
              </DefaultLayout>
            }></Route>
          <Route
            path="/join"
            element={
              <DefaultLayout>
                <Join />
              </DefaultLayout>
            }></Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
