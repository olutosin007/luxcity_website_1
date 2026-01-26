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
import Tools from './pages/Tools';
import AIReadinessAssessment from './pages/tools/AIReadinessAssessment';
import RegulatoryComplianceChecker from './pages/tools/RegulatoryComplianceChecker';
import ROICalculatorSuite from './pages/tools/ROICalculatorSuite';

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
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/ai-readiness-assessment" element={<AIReadinessAssessment />} />
          <Route path="/tools/regulatory-compliance-checker" element={<RegulatoryComplianceChecker />} />
          <Route path="/tools/roi-calculator-suite" element={<ROICalculatorSuite />} />
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