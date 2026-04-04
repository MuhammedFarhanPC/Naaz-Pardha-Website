import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-beige dark:bg-brand-black transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        <motion.div
           initial={{ opacity: 0, x: -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true, amount: 0.3 }}
           className="relative h-[600px] w-full rounded-tl-[80px] rounded-br-[80px] overflow-hidden shadow-2xl"
        >
          <img 
            src="/assets/images/casual_collection_1775057160544.png"
            alt="Naaz Pardha store experience"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-gold/10 mix-blend-multiply"></div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true, amount: 0.3 }}
           className="space-y-6"
        >
          <h2 className="text-sm font-medium tracking-[0.2em] text-brand-gold uppercase text-left">About Us</h2>
          <h3 className="text-4xl md:text-5xl font-serif text-brand-black dark:text-brand-beige leading-snug">
            Your Destination for <br className="hidden md:block"/> Modest Fashion
          </h3>
          <div className="h-1 w-20 bg-brand-gold my-8"></div>
          
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
            Located in the heart of Ramanattukara, Kerala, <strong>Naaz Pardha</strong> is a premium boutique offering an exclusive collection of Abayas and Pardhas. We believe modesty should never compromise elegancy.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mt-4">
            From everyday wear to heavy bridal collections, every piece in our store is selected for its superior fabric, exquisite design, and unmatched comfort.
          </p>

          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 mt-8 space-y-4">
             <div className="flex items-center space-x-4 text-brand-black dark:text-brand-beige">
                <div className="p-3 bg-brand-pastel dark:bg-gray-900 rounded-full">
                   <MapPin className="text-brand-gold" size={24} />
                </div>
                <div>
                   <p className="font-medium">Visit our Store</p>
                   <p className="text-sm text-gray-500 dark:text-gray-400">Rose Complex, Opp Kandai Petrol Pump, Ramanattukara</p>
                </div>
             </div>
             
             <div className="flex items-center space-x-4 text-brand-black dark:text-brand-beige">
                <div className="p-3 bg-brand-pastel dark:bg-gray-900 rounded-full">
                   <Phone className="text-brand-gold" size={24} />
                </div>
                <div>
                   <p className="font-medium">Call Us</p>
                   <a href="tel:9809758012" className="text-sm text-gray-500 hover:text-brand-gold transition-colors dark:text-gray-400">9809758012</a>
                </div>
             </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
