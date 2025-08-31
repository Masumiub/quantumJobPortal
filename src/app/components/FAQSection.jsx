import { ChevronDown } from "lucide-react";

export default function FAQSection() {
  const faqs = [
    {
      question: "How do I create an account on QuantumJobPortal?",
      answer: "Click the 'Sign Up' button in the top right corner, fill in your details, verify your email address, and complete your profile to get started."
    },
    {
      question: "Is QuantumJobPortal free for job seekers?",
      answer: "Yes, our platform is completely free for job seekers. You can create a profile, search for jobs, and apply to opportunities without any cost."
    },
    {
      question: "How does the job matching algorithm work?",
      answer: "Our AI-powered algorithm analyzes your skills, experience, and preferences to match you with the most relevant job opportunities from our database."
    },
    {
      question: "Can I apply for jobs directly through the platform?",
      answer: "Absolutely! You can apply to jobs directly through QuantumJobPortal with just a few clicks. Your profile information auto-fills application forms."
    },
    {
      question: "How do employers contact me?",
      answer: "Employers can message you directly through our secure messaging system. You'll receive email notifications for new messages."
    },
    {
      question: "What makes QuantumJobPortal different from other job sites?",
      answer: "We offer advanced AI matching, real-time notifications, comprehensive employer reviews, and a user-friendly interface designed specifically for tech professionals."
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-green-900/40">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about using QuantumJobPortal
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="collapse bg-gray-900/50 border border-gray-800 hover:border-green-500/50 transition-all group"
            >
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title font-semibold text-white text-lg flex items-center justify-between group-hover:text-green-400 transition-colors">
                {faq.question}
                <ChevronDown className="w-5 h-5 text-green-400 transform group-hover:rotate-180 transition-transform" />
              </div>
              <div className="collapse-content">
                <p className="text-gray-300 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="text-center mt-12 pt-12 border-t border-gray-800">
          <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Our support team is here to help you</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-black font-semibold px-8 py-3 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all">
              Contact Support
            </button>
            <button className="border border-green-500/30 text-green-400 font-semibold px-8 py-3 rounded-lg hover:bg-green-500/10 transition-all">
              Browse Help Center
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}