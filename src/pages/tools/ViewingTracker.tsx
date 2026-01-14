import { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../../components/SEO';

interface Viewing {
  id: string;
  property: string;
  agent: string;
  viewingDate: string;
  status: string;
  notes: string;
}

export default function ViewingTracker() {
  const [viewings, setViewings] = useState<Viewing[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Viewing>>({
    property: '',
    agent: '',
    viewingDate: '',
    status: 'Scheduled',
    notes: '',
  });

  const handleAdd = () => {
    if (!formData.property || !formData.agent) return;
    const newViewing: Viewing = {
      id: Date.now().toString(),
      property: formData.property || '',
      agent: formData.agent || '',
      viewingDate: formData.viewingDate || '',
      status: formData.status || 'Scheduled',
      notes: formData.notes || '',
    };
    setViewings([...viewings, newViewing]);
    setFormData({ property: '', agent: '', viewingDate: '', status: 'Scheduled', notes: '' });
    setIsAdding(false);
  };

  const handleEdit = (id: string) => {
    const viewing = viewings.find(v => v.id === id);
    if (viewing) {
      setFormData(viewing);
      setEditingId(id);
      setIsAdding(true);
    }
  };

  const handleUpdate = () => {
    if (!editingId) return;
    setViewings(viewings.map(v => v.id === editingId ? { ...v, ...formData } as Viewing : v));
    setFormData({ property: '', agent: '', viewingDate: '', status: 'Scheduled', notes: '' });
    setEditingId(null);
    setIsAdding(false);
  };

  const handleDelete = (id: string) => {
    setViewings(viewings.filter(v => v.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO
        title="Property Viewing Tracker | Free UK Rental Property Viewing Manager - Luxcity"
        description="Track all your UK property viewings in one place. Manage viewing dates, agent contacts, property details, and notes for multiple rental properties. Free property viewing tracker tool."
        canonical="/tools/viewing-tracker"
        keywords={[
          'property viewing tracker',
          'rental property viewing tracker',
          'property viewing manager',
          'UK property viewings',
          'rental viewing tracker',
          'property viewing organizer',
          'viewing schedule tracker',
          'property viewing notes',
          'rental property viewings',
          'property viewing management',
          'viewing tracker tool',
          'property viewing calendar',
          'rental viewing organizer',
          'UK property viewing tracker',
          'property viewing log'
        ]}
        relatedTerms={[
          'how to track property viewings',
          'property viewing management',
          'rental property viewing schedule',
          'property viewing notes template',
          'UK rental property viewings',
          'property viewing organization',
          'rental viewing calendar',
          'property viewing checklist',
          'rental property viewing tips',
          'property viewing tracker app'
        ]}
        category="Rental Tools"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link 
          to="/tools" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Tools
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Track Your UK Property Viewings
              </h1>
              <p className="text-lg text-gray-600">
                When you're viewing multiple rental properties and speaking to different letting agents, property details and viewing information get lost quickly. Keep all your UK property viewings organized in one place with this free viewing tracker.
              </p>
            </div>
            <button
              onClick={() => {
                setIsAdding(!isAdding);
                setEditingId(null);
                setFormData({ property: '', agent: '', viewingDate: '', status: 'Scheduled', notes: '' });
              }}
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Viewing
            </button>
          </div>

          {isAdding && (
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingId ? 'Edit Viewing' : 'Add New Viewing'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Property Address"
                  value={formData.property}
                  onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Agent/Company"
                  value={formData.agent}
                  onChange={(e) => setFormData({ ...formData, agent: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <input
                  type="date"
                  value={formData.viewingDate}
                  onChange={(e) => setFormData({ ...formData, viewingDate: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Applied">Applied</option>
                </select>
                <textarea
                  placeholder="Notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2"
                  rows={3}
                />
              </div>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={editingId ? handleUpdate : handleAdd}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  {editingId ? 'Update' : 'Add'}
                </button>
                <button
                  onClick={() => {
                    setIsAdding(false);
                    setEditingId(null);
                    setFormData({ property: '', agent: '', viewingDate: '', status: 'Scheduled', notes: '' });
                  }}
                  className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {viewings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Add your first viewing to get started.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Property</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Agent</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Viewing Date</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Notes</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {viewings.map((viewing) => (
                    <tr key={viewing.id} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{viewing.property}</td>
                      <td className="py-3 px-4 text-gray-600">{viewing.agent}</td>
                      <td className="py-3 px-4 text-gray-600">{viewing.viewingDate}</td>
                      <td className="py-3 px-4">
                        <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-700 rounded-full">
                          {viewing.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{viewing.notes}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(viewing.id)}
                            className="p-2 text-indigo-600 hover:bg-indigo-50 rounded"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(viewing.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {viewings.length > 3 && (
          <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Managing Multiple Property Viewings</h3>
            <p className="text-gray-700">
              You're tracking multiple UK rental properties. Keeping all your property viewing details, agent contacts, and viewing notes organized can get challenging without a proper system.
            </p>
          </div>
        )}

        <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Track Your Property Viewings?</h3>
          <p className="text-gray-700 mb-3">
            Managing more than a few rental property applications and viewings manually gets messy fast. This property viewing tracker helps you keep all your UK property viewing information, agent contacts, and viewing notes organized in one place.
          </p>
          <p className="text-gray-700">
            Stay organized during your rental property search and never lose track of important property viewing details or letting agent information.
          </p>
        </div>
      </div>
    </div>
  );
}

