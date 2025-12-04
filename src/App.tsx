import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Solutions from './pages/Solutions';
import Labs from './pages/Labs';
import Insights from './pages/Insights';
import Company from './pages/Company';
import InsightPost from './pages/InsightPost';
import InsightsManager from './pages/admin/InsightsManager';
import Contact from './pages/Contact';
import Sitemap from './pages/Sitemap';
import PrivacyPolicy from './pages/PrivacyPolicy';

function App() {
  return (
    <HelmetProvider>
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
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/sitemap.xml" element={<Sitemap />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HelmetProvider>
  );
}

export default App;