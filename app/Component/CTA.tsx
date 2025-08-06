import React from 'react';

const CTA = () => {
  return (
    <section className="bg-purple-700 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold">
          Let's deliver great <br /> together
        </h2>
        <p className="mt-4 mb-8 max-w-xl mx-auto">
          Join thousands who trust us for quick, stress-free deliveries. Your next smart move? Let's get started.
        </p>
        <div className="space-x-4">
          <button className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg">
            Learn more
          </button>
          <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg">
            Get started
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;