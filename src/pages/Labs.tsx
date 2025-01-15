import { ArrowRight } from 'lucide-react';

export default function Labs() {
  const experiments = [
    {
      title: "AI Property Matchmaker",
      status: "Alpha Testing",
      description: "Using neural networks to match buyers with their ideal properties based on behavioral patterns and preferences.",
      progress: 75,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800&h=400"
    },
    {
      title: "Virtual Property Staging",
      status: "Beta",
      description: "AI-powered system that automatically generates photorealistic virtual staging for empty properties.",
      progress: 90,
      image: "https://images.unsplash.com/photo-1558442086-8ea19a79cd4d?auto=format&fit=crop&q=80&w=800&h=400"
    }
  ];

  return (
    <div>
      <section 
        className="h-[80vh] relative bg-cover bg-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80")'
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-[56px] font-archivo font-bold text-white mb-6">
              Luxcity Labs
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Exploring the future of real estate technology
            </p>
          </div>
        </div>
      </section>

      {/* Rest of the component remains unchanged */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16">
            {experiments.map((experiment, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-8 lg:p-12 space-y-6">
                    <div className="flex items-center space-x-4">
                      <h2 className="text-2xl font-bold text-gray-900">{experiment.title}</h2>
                      <span className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-full">
                        {experiment.status}
                      </span>
                    </div>
                    <p className="text-gray-600">{experiment.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Development Progress</span>
                        <span className="text-indigo-600 font-medium">{experiment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${experiment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <button className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
                      Learn More <ArrowRight className="ml-2 h-5 w-5" />
                    </button>
                  </div>
                  <div className="relative h-64 lg:h-auto">
                    <img
                      src={experiment.image}
                      alt={experiment.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}