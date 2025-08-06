import React from 'react';

const Hero = () => {
  return (
    <section className="bg-purple-700 text-white">
      <div className="container mx-auto px-6 py-20 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider">Smarter tools for better delivery management</p>
        <h1 className="text-5xl md:text-6xl font-bold mt-4 mb-6">
          We're here to level up your <br /> delivery management.
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Whether it's your daily essentials or a last-minute gift, we make sure your items arrive safely, quickly, and hassle-free.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-lg">
            Get started
          </button>
          <button className="bg-transparent border border-white text-white font-semibold px-6 py-3 rounded-lg">
            Request For Demo
          </button>
        </div>
        <div className="mt-16">
          <img src="/imageDemo.png" alt="Truemove Dashboard" className="max-w-4xl mx-auto rounded-lg shadow-2xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;