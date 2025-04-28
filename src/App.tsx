// src/App.tsx
import "./index.css";
import Homepage from "./pages/Homepage";
import Mypost from "./pages/Mypost";
import ProtectedRoute from "./components/Protectedroute";
import Navbar from "./components/Navbar"; // import the layout
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <div className="bg-surface-background min-h-screen">
        <Navbar/> {/* Wrap Routes inside Layout */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/my/posts" element={<Mypost />} />
            </Route>
          </Routes>
      </div>
    </Router>
  );
}
