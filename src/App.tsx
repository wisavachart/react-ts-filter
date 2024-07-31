import MainComponent from "./components/MainComponent";
import Sidebar from "./components/Sidebar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="rounded w-full flex justify-between flex-wrap">
          <Routes>
            <Route path="/" element={<MainComponent />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
