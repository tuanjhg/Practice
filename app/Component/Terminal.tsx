import React from 'react';
import { FaStar } from 'react-icons/fa';  
const TestimonialCard = ({ quote, name, role, avatarUrl }: { quote: string; name: string; role: string; avatarUrl: string }) => (
  <div className="bg-white p-8 rounded-lg shadow-md">
    <div className="flex text-yellow-400 mb-4">
      {[...Array(5)].map((_, i) => <FaStar key={i} className="w-5 h-5" />)}
    </div>
    <p className="text-gray-600 mb-6">"{quote}"</p>
    <div className="flex items-center">
      <img className="w-12 h-12 rounded-full mr-4" src={avatarUrl} alt={name} />
      <div>
        <p className="font-semibold text-gray-900">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  </div>
);


const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="md:pr-8">
            <p className="text-sm font-semibold text-purple-700 uppercase">Testimonials</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
              They ordered, we delivered
            </h2>
            <p className="text-gray-600">
              Hear directly from those who trust us to bring what they need, right when they need it.
            </p>
          </div>

          <div className="space-y-8">
            <TestimonialCard
              quote="We switched to this delivery service to save time in everything. This delivery service has made it possible for us to reach more customers happy. Their reliability and deliveries are always on time. I never had to worry about missing packages anymore."
              name="Daniel Roy"
              role="Product Design Manager"
              avatarUrl="https://i.pravatar.cc/150?u=danielroy" 
            />
            <TestimonialCard
              quote="This delivery service has been an essential part of how we run our business. Their reliability and speed are unparalleled. Every single interaction has been a breeze, making them an essential part of how we built."
              name="Lisa Chowdhury"
              role="Founder, Chowdhury Inc."
              avatarUrl="https://i.pravatar.cc/150?u=lisachowdhury" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;