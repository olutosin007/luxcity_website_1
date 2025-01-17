import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Labs from './pages/Labs';
import Insights from './pages/Insights';
import Company from './pages/Company';
import InsightPost from './pages/InsightPost';
import InsightsManager from './pages/admin/InsightsManager';

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/labs" element={<Labs />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/insights/:slug" element={<InsightPost />} />
          <Route path="/admin/insights" element={<InsightsManager />} />
          <Route path="/company" element={<Company />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;