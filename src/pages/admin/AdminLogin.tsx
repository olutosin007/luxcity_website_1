import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { signIn, isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isConfigured) {
    return (
      <div className="pt-28 md:pt-36 min-h-[60vh] flex items-center justify-center px-4">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-md text-center">
          <p className="text-amber-800 font-medium">Firebase is not configured</p>
          <p className="text-amber-700 text-sm mt-2">
            Add your Firebase config to <code className="bg-amber-100 px-1 rounded">.env</code> (see <code className="bg-amber-100 px-1 rounded">.env.example</code>) to use the admin and Firestore-backed insights.
          </p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 md:pt-36 min-h-[60vh] flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm border border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-6">Admin sign in</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#DC5F12] focus:border-[#DC5F12]"
              required
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#DC5F12] focus:border-[#DC5F12]"
              required
              autoComplete="current-password"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-[#DC5F12] text-white font-medium rounded-lg hover:bg-[#c45510] disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
