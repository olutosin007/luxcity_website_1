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
import ReadinessChecker from './pages/tools/ReadinessChecker';
import DocumentTracker from './pages/tools/DocumentTracker';
import ViewingTracker from './pages/tools/ViewingTracker';
import ProcessSimulator from './pages/tools/ProcessSimulator';
import TimelineGenerator from './pages/tools/TimelineGenerator';
import KnowYourRights from './pages/tools/KnowYourRights';

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
          {/* Tools section temporarily hidden until tools are selected */}
          {/* <Route path="/tools" element={<Tools />} />
          <Route path="/tools/readiness-checker" element={<ReadinessChecker />} />
          <Route path="/tools/document-tracker" element={<DocumentTracker />} />
          <Route path="/tools/viewing-tracker" element={<ViewingTracker />} />
          <Route path="/tools/process-simulator" element={<ProcessSimulator />} />
          <Route path="/tools/timeline-generator" element={<TimelineGenerator />} />
          <Route path="/tools/know-your-rights" element={<KnowYourRights />} /> */}
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