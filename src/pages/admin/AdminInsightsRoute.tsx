import { useAuth } from '../../context/AuthContext';
import AdminLogin from './AdminLogin';
import InsightsManager from './InsightsManager';

/** Renders admin insights: login when Firebase is configured and not signed in; otherwise InsightsManager. */
export default function AdminInsightsRoute() {
  const { user, loading, isConfigured } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DC5F12]" />
      </div>
    );
  }

  if (isConfigured && !user) {
    return <AdminLogin />;
  }

  return <InsightsManager />;
}
