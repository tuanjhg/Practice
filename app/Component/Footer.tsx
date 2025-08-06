import React from 'react';
import { FaLinkedinIn, FaInstagram, FaGoogle, FaTwitter } from 'react-icons/fa';
import { IoLogoFacebook } from 'react-icons/io';

const SocialIcon = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-gray-800 h-10 w-10 flex items-center justify-center rounded-full text-gray-400 hover:bg-purple-700 hover:text-white transition-colors"
  >
    {children}
  </a>
);

const Footer = () => {
  return (
    <footer className="bg-black">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-700 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17l6-6-6-6"></path>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white">Truemove</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400">Follow us on:</span>
            <div className="flex items-center space-x-2">
                <SocialIcon href="https://www.facebook.com">
                    <IoLogoFacebook />
                </SocialIcon>
                <SocialIcon href="https://www.twitter.com">
                    <FaTwitter />
                </SocialIcon>
                <SocialIcon href="https://www.instagram.com">
                    <FaInstagram />
                </SocialIcon>
                <SocialIcon href="https://www.google.com">
                    <FaGoogle />
                </SocialIcon>
              <SocialIcon href="#"><FaLinkedinIn /></SocialIcon> 
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;