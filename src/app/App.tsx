import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { BottomNav } from "@/components/layout/BottomNav";
import { initNative } from "@/lib/nativeBootstrap";
import Home from "@/pages/Home";
import Roadmap from "@/pages/Roadmap";
import StageDetail from "@/pages/StageDetail";
import HiraganaLessonScreen from "@/pages/HiraganaLessonScreen";
import Practice from "@/pages/Practice";
import Review from "@/pages/Review";
import Profile from "@/pages/Profile";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Android hardware back: go up a screen; only exit the app from Home.
    initNative(() => {
      if (location.pathname !== "/") {
        navigate(-1);
        return true;
      }
      return false;
    });
  }, [location.pathname, navigate]);

  return (
    <div className="min-h-screen bg-paper-100">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/roadmap/:stageId" element={<StageDetail />} />
        <Route path="/roadmap/hiragana/lesson/:lessonNumber" element={<HiraganaLessonScreen />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/review" element={<Review />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
