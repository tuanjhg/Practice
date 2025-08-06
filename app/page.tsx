import React, { useState } from 'react';
import Header from './Component/Header';
import Hero from './Component/Hero';
import Partners from './Component/Partner';
import Features from './Component/Features';
import Testimonials from './Component/Terminal';
import FAQ from './Component/FAQ';
import CTA from './Component/CTA';
import Footer from './Component/Footer';

export default function Home() {
  return (
    <div className="bg-white">
      <Header />
      <main>
        <Hero />
        <Partners />
        <Features />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}