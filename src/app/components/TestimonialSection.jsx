import { Star, Quote } from "lucide-react";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Software Developer",
      company: "TechCorp",
      content: "QuantumJobPortal completely transformed my job search. I found my dream job within two weeks of using the platform!",
      rating: 5,
      avatar: "/avatars/sarah.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Product Manager",
      company: "InnovateCo",
      content: "The intelligent matching system connected me with opportunities I wouldn't have found anywhere else.",
      rating: 5,
      avatar: "/avatars/michael.jpg"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "UX Designer",
      company: "DesignStudio",
      content: "The application process was seamless, and the employer responses were incredibly fast. Highly recommend!",
      rating: 4,
      avatar: "/avatars/emily.jpg"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-green-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Discover why thousands of professionals trust QuantumJobPortal for their career growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-xl bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group relative overflow-hidden"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="w-12 h-12 text-green-400" />
              </div>

              {/* Rating Stars */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Content */}
              <p className="text-gray-300 mb-6 italic relative z-10">
                "{testimonial.content}"
              </p>

              {/* User Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-12 border-t border-gray-800">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">10K+</div>
            <p className="text-gray-400">Successful Hires</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">95%</div>
            <p className="text-gray-400">Satisfaction Rate</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-400 mb-2">2W</div>
            <p className="text-gray-400">Average Hire Time</p>
          </div>
        </div>
      </div>
    </section>
  );
}