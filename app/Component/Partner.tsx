import React from 'react';

const Partners = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-sm font-semibold text-gray-600 mb-6">Trusted by our trusted partners and customers</h2>
        <div className="flex justify-center items-center space-x-8 md:space-x-12">
          <span className="text-gray-400 font-bold text-xl">FoxyApps</span>
          <span className="text-gray-400 font-bold text-xl">Galaxy</span>
          <span className="text-red-500 font-bold text-xl">Delivery Hero</span>
          <span className="text-gray-400 font-bold text-xl">Allogistic</span>
        </div>
      </div>
    </section>
  );
};

export default Partners;