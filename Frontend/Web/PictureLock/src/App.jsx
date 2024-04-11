import { Routes, Route } from "react-router-dom";
import { RecommendationPage, LandingPage, SignUpPage, RoadmapPage } from "./pages";
import { Analytics } from "@vercel/analytics/react";
import Layout from "./components/Layout";

export default function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/beta" element={<SignUpPage />} />
          <Route path="/recommend" element={<RecommendationPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
        </Routes>
      </Layout>
      <Analytics />
    </>
  );
}