import { useState, FormEvent, useEffect } from 'react';
import { Mail, Building, User, X } from 'lucide-react';

interface DataCollectionFormProps {
  onSubmit: (data: FormData) => void;
  toolName: string;
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
}

export default function DataCollectionForm({ onSubmit, toolName, isOpen, onClose }: DataCollectionFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Call the parent's onSubmit callback
      // The parent component will handle the API submission with tool-specific data
      onSubmit(formData);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-xl shadow-2xl p-8 border-2 border-indigo-200 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
          <Mail className="h-8 w-8 text-indigo-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2 font-archivo">One More Step</h3>
        <p className="text-gray-600 font-archivo">
          Get your personalized {toolName} report by completing this brief form.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-archivo">
            <User className="inline h-4 w-4 mr-1" />
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Smith"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600 font-archivo">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-archivo">
            <Mail className="inline h-4 w-4 mr-1" />
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john.smith@example.com"
          />
          {errors.email && <p className="mt-1 text-sm text-red-600 font-archivo">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2 font-archivo">
            <Building className="inline h-4 w-4 mr-1" />
            Company Name *
          </label>
          <input
            type="text"
            id="company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.company ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Your Company Ltd"
          />
          {errors.company && <p className="mt-1 text-sm text-red-600 font-archivo">{errors.company}</p>}
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2 font-archivo">
            Your Role *
          </label>
          <select
            id="role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select your role</option>
            <option value="landlord">Landlord</option>
            <option value="property-manager">Property Manager</option>
            <option value="letting-agent">Letting Agent</option>
            <option value="property-developer">Property Developer</option>
            <option value="housing-association">Housing Association</option>
            <option value="investor">Property Investor</option>
            <option value="other">Other</option>
          </select>
          {errors.role && <p className="mt-1 text-sm text-red-600 font-archivo">{errors.role}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-[#2e70b3] text-white py-3 rounded-lg font-medium hover:bg-[#2565a0] transition-colors mt-6 font-archivo"
        >
          <span className="font-archivo">Get My Report</span>
        </button>

        <p className="text-xs text-gray-500 text-center mt-4 font-archivo">
          By submitting this form, you agree to receive relevant updates from Luxcity. 
          We respect your privacy and will never share your information.
        </p>
      </form>
      </div>
    </div>
  );
}
