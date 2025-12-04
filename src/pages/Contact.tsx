import React, { useState, useRef } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  companyName?: string;
  interest?: string;
  timeline?: string;
  message?: string;
  howDidYouHear?: string;
}

export default function Contact() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    interest: '',
    timeline: '',
    message: '',
    howDidYouHear: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'firstName':
        if (!value.trim()) {
          return 'First name is required';
        }
        if (value.trim().length < 2) {
          return 'First name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          return 'First name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';
      
      case 'lastName':
        if (!value.trim()) {
          return 'Last name is required';
        }
        if (value.trim().length < 2) {
          return 'Last name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) {
          return 'Last name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return '';
      
      case 'email':
        if (!value.trim()) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) {
          return 'Please enter a valid email address';
        }
        return '';
      
      case 'phone':
        if (value.trim() && !/^[\d\s\-\+\(\)]+$/.test(value.trim())) {
          return 'Please enter a valid phone number';
        }
        return '';
      
      case 'companyName':
        if (!value.trim()) {
          return 'Company name is required';
        }
        if (value.trim().length < 2) {
          return 'Company name must be at least 2 characters';
        }
        return '';
      
      case 'interest':
        if (!value) {
          return 'Please select a product';
        }
        return '';
      
      case 'timeline':
        if (!value) {
          return 'Please select a timeline';
        }
        return '';
      
      case 'message':
        if (!value.trim()) {
          return 'Message is required';
        }
        if (value.trim().length < 10) {
          return 'Message must be at least 10 characters';
        }
        return '';
      
      case 'howDidYouHear':
        if (!value) {
          return 'Please select how you heard about us';
        }
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) {
        newErrors[key as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error || undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Success
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.' 
      });
      
      // Reset form after successful submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyName: '',
        interest: '',
        timeline: '',
        message: '',
        howDidYouHear: ''
      });
      setErrors({});
      setTouched({});

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

    } catch (error: any) {
      setSubmitStatus({ 
        type: 'error', 
        message: error.message || 'Something went wrong. Please try again later or contact us directly.' 
      });
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Validate on change if field has been touched
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error || undefined }));
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        {/* Background Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/person-typing-720.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-indigo-900/50 to-blue-900/50"></div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-[65px] sm:text-[55px] md:text-[70px] lg:text-[85px] font-archivo font-light leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-[#ffdbcc] via-purple-100 to-indigo-200 mb-6 animate-fade-in">
              Contact us
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Get in touch with our team to learn more about how we can help transform your real estate operations with AI.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in touch</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-[#DC5F12] mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Call us</h3>
                    <p className="mt-1 text-gray-600">+44 (0) 203 189 1276</p>
                    <p className="text-sm text-gray-500">Mon-Fri 9-5pm</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-[#DC5F12] mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Email us</h3>
                    <p className="mt-1 text-gray-600">contactus@theluxcity.co.uk</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-[#DC5F12] mt-1" />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900">Our office</h3>
                    <p className="mt-1 text-gray-600">
                      86-90 Paul Street<br />
                      London EC2A 4NE<br />
                      United Kingdom
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              {/* Success/Error Messages */}
              {submitStatus.type && (
                <div
                  className={`mb-6 p-4 rounded-lg ${
                    submitStatus.type === 'success'
                      ? 'bg-green-50 border border-green-200 text-green-800'
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}
                >
                  <p className="font-medium">{submitStatus.message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                        errors.firstName && touched.firstName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.firstName && touched.firstName && (
                      <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                        errors.lastName && touched.lastName
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.lastName && touched.lastName && (
                      <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                        errors.email && touched.email
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.email && touched.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                        errors.phone && touched.phone
                          ? 'border-red-500 focus:ring-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {errors.phone && touched.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    required
                    value={formData.companyName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                      errors.companyName && touched.companyName
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                  />
                  {errors.companyName && touched.companyName && (
                    <p className="mt-1 text-sm text-red-600">{errors.companyName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700">
                    What product are you enquiring about? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    required
                    value={formData.interest}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                      errors.interest && touched.interest
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Please Select</option>
                    <option value="ai-search">AI-Powered Home Search</option>
                    <option value="market-insights">Predictive Market Insights</option>
                    <option value="virtual-agents">Virtual Agents & Assistants</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.interest && touched.interest && (
                    <p className="mt-1 text-sm text-red-600">{errors.interest}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="timeline" className="block text-sm font-medium text-gray-700">
                    What timeline are you working to for this project? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="timeline"
                    name="timeline"
                    required
                    value={formData.timeline}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                      errors.timeline && touched.timeline
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Please Select</option>
                    <option value="immediate">Immediate</option>
                    <option value="1-3-months">1-3 months</option>
                    <option value="3-6-months">3-6 months</option>
                    <option value="6-12-months">6-12 months</option>
                    <option value="12-months-plus">12+ months</option>
                  </select>
                  {errors.timeline && touched.timeline && (
                    <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    How can we help? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                      errors.message && touched.message
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.message && touched.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="howDidYouHear" className="block text-sm font-medium text-gray-700">
                    How did you hear about us? <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="howDidYouHear"
                    name="howDidYouHear"
                    required
                    value={formData.howDidYouHear}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`mt-1 block w-full px-4 py-3 bg-gray-50 border rounded-lg focus:ring-2 focus:ring-[#DC5F12] focus:border-transparent transition-colors duration-200 ${
                      errors.howDidYouHear && touched.howDidYouHear
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300'
                    }`}
                  >
                    <option value="">Please Select</option>
                    <option value="search">Search Engine</option>
                    <option value="social">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="event">Event</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.howDidYouHear && touched.howDidYouHear && (
                    <p className="mt-1 text-sm text-red-600">{errors.howDidYouHear}</p>
                  )}
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="privacy"
                      name="privacy"
                      type="checkbox"
                      required
                      className="h-4 w-4 text-[#DC5F12] border-gray-300 rounded focus:ring-[#DC5F12]"
                    />
                  </div>
                  <div className="ml-3">
                    <label htmlFor="privacy" className="text-sm text-gray-600">
                      By clicking submit below, you consent to allow Luxcity to store and process the personal information submitted above to provide you the content requested. You may unsubscribe from these communications at any time.
                    </label>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-8 py-4 bg-[#DC5F12] text-white rounded-xl transition-all duration-300 flex items-center justify-center ${
                      isSubmitting
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-[#c45510]'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send message'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 