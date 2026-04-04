import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section id="home" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax effect simulation using fixed attachment or just cover */}
      <div 
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: 'url(/assets/images/hero_bg_1775057142060.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%', // Shift to focus on the model properly
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-brand-black/40"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-brand-gold font-medium tracking-[0.3em] uppercase mb-4 text-sm md:text-base"
        >
          Welcome to Naaz Pardha
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-beige mb-6 leading-tight"
        >
          Elegance in <br className="hidden md:block"/> Modesty
        </motion.h1>
        
        <motion.p
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1, delay: 0.8 }}
           className="text-gray-200 max-w-2xl mx-auto mb-10 text-lg md:text-xl font-light"
        >
          Discover our premium collection of everyday, party wear, and bridal pardhas at our Ramanattukara boutique.
        </motion.p>
        
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 1 }}
        >
          <a
            href="#collection"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-black hover:bg-white hover:text-brand-black transition-all duration-300 rounded-sm font-medium tracking-wide"
          >
            Explore Collection
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
