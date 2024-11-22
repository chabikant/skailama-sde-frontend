import { lazy, Suspense, useState } from "react";
import "./App.css";
import Loader from "../src/components/LoaderComponent/Loader";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const LoginPage = lazy(() => import("../src/pages/Loginpage/Login"));
const AllProjectsPage = lazy(() =>
  import("../src/pages/Allprojectspage/Allprojects")
);
const HomePage = lazy(() => import("../src/pages/Homepage/Home"));
const ProjectPage = lazy(() => import("../src/pages/ProjectPage/Project"));

function App() {
  return (
    <>
      {/* <Loader /> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <Suspense fallback={<Loader />}>
                <LoginPage />
              </Suspense>
            }
          />
          <Route
            path="/all-projects"
            element={
              <Suspense fallback={<Loader />}>
                <AllProjectsPage />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={<Loader />}>
                <HomePage />
              </Suspense>
            }
          />
          <Route
            path="/project/:id"
            element={
              <Suspense fallback={<Loader />}>
                <ProjectPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
