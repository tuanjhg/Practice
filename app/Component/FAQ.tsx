'use client'; 

import React, { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';



const faqs = [
  {
    question: "How can I track my delivery?",
    answer: "You can track your order in real-time through our website or mobile app. Just enter your tracking number on the designated page to see the updated delivery time."
  },
  {
    question: "What areas do you deliver to?",
    answer: "We currently deliver to all major metropolitan areas. We are constantly expanding our reach, so please check our website for the most up-to-date list of service areas."
  },
  {
    question: "What happens if I miss a delivery?",
    answer: "If you miss a delivery, our courier will attempt to redeliver on the next business day. You can also reschedule your delivery through our customer support portal."
  },
  {
    question: "How do I contact customer support?",
    answer: "Our customer support team is available 24/7 via phone, email, or live chat on our website. We are always here to help you with any questions or concerns."
  },
  {
    question: "Can I schedule a delivery in advance?",
    answer: "Yes, you can schedule a delivery up to 30 days in advance. This feature is perfect for planning gifts, business shipments, and more."
  },
  {
    question: "Are my packages insured during delivery?",
    answer: "Yes, all packages are automatically insured up to a certain value. For high-value items, we offer additional insurance options for complete peace of mind."
  }
];

const FAQItem = ({ faq, isOpen, onClick }: { faq: { question: string, answer: string }, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-gray-200 py-6">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="text-lg font-medium text-gray-900">{faq.question}</h3>
        <span className="text-purple-700">
          {isOpen ? <FiMinus /> : <FiPlus />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};


const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); 

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="md:pr-8">
            <p className="text-sm font-semibold text-purple-700 uppercase">FAQs</p>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
              Answers you can count on
            </h2>
            <p className="text-gray-600">
              From delivery times to payment methods—find reliable answers to the questions we hear most.
            </p>
          </div>
          <div>
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;