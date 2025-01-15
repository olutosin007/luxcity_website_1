import { ArrowRight } from 'lucide-react';

export default function Company() {
  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Michael Rodriguez",
      role: "Chief Technology Officer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
    },
    {
      name: "Emily Thompson",
      role: "Head of AI Research",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400&h=400"
    }
  ];

  const values = [
    {
      title: "Innovation First",
      description: "We push the boundaries of what's possible in real estate technology."
    },
    {
      title: "Client Success",
      description: "Our clients' success is our success. We're committed to delivering exceptional value."
    },
    {
      title: "Future-Ready",
      description: "We build solutions that anticipate and adapt to future market needs."
    }
  ];

  return (
    <div>
      <section 
        className="h-[80vh] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-[56px] font-archivo font-bold text-white mb-6">
              About Luxcity
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We're on a mission to transform the real estate industry through artificial intelligence and advanced technology
            </p>
          </div>
        </div>
      </section>

      {/* Rest of the component remains unchanged */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Vision Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-600 mb-8">
                At Luxcity, we envision a future where real estate decisions are powered by intelligent technology, making property transactions more efficient, transparent, and accessible to everyone.
              </p>
              <p className="text-lg text-gray-600">
                Founded in 2023, we've quickly become a leading force in PropTech innovation, combining artificial intelligence with deep real estate expertise.
              </p>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800&h=500"
                alt="Luxcity office"
                className="rounded-2xl shadow-xl"
              />
            </div>
          </div>

          {/* Values Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Leadership Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Journey</h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who share our vision of transforming the real estate industry through technology.
            </p>
            <button className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
              View Open Positions <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}