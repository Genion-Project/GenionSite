import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./layouts/Layout";
import { Home } from "./pages/Home";

const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Services = lazy(() => import("./pages/Services").then(m => ({ default: m.Services })));
const Team = lazy(() => import("./pages/Team").then(m => ({ default: m.Team })));
const Projects = lazy(() => import("./pages/Projects").then(m => ({ default: m.Projects })));
const Contact = lazy(() => import("./pages/Contact").then(m => ({ default: m.Contact })));
const Profile = lazy(() => import("./pages/Profile").then(m => ({ default: m.Profile })));

export const App: React.FC = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0d0d0d]">
            <div className="text-gray-600 dark:text-gray-400">Loading...</div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<Team />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
