import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-brand-black text-brand-beige py-12 px-4 sm:px-6 lg:px-8 border-t border-brand-gold/20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        <div className="col-span-1 md:col-span-2">
          <a href="#home" className="font-serif text-3xl font-bold tracking-wider inline-block mb-4">
            NAAZ<span className="text-brand-gold">.</span>
          </a>
          <p className="text-gray-400 max-w-sm mb-6">
            Elegance in modesty. Discover our premium collection of everyday, party wear, and bridal pardhas.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors">
              <FaFacebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-brand-gold hover:border-brand-gold transition-colors">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        <div>
           <h4 className="font-serif text-lg font-medium mb-4 text-brand-gold">Quick Links</h4>
           <ul className="space-y-2">
             <li><a href="#home" className="text-gray-400 hover:text-brand-beige transition-colors">Home</a></li>
             <li><a href="#about" className="text-gray-400 hover:text-brand-beige transition-colors">About Us</a></li>
             <li><a href="#collection" className="text-gray-400 hover:text-brand-beige transition-colors">Collections</a></li>
             <li><a href="#gallery" className="text-gray-400 hover:text-brand-beige transition-colors">Gallery</a></li>
           </ul>
        </div>

        <div>
           <h4 className="font-serif text-lg font-medium mb-4 text-brand-gold">Location</h4>
           <a 
             href="https://maps.app.goo.gl/Z6cTpa7vDcrm39fMA" 
             target="_blank" 
             rel="noreferrer"
             className="text-gray-400 hover:text-brand-beige transition-colors block mb-2"
           >
             Naaz Pardha & Ladies Garments, <br/>
             Rose Complex, Ramanattukara, <br/>
             Kerala 673633
           </a>
           <a href="tel:9809758012" className="text-brand-gold hover:text-brand-beige transition-colors block font-medium">
             +91 98097 58012
           </a>
        </div>

      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} Naaz Pardha. All rights reserved.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a href="#" className="hover:text-brand-gold transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-gold transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
