import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  return (
    <motion.a
      href="https://wa.me/919809758012?text=Hello%20Naaz%20Pardha!%20I%20would%20like%20to%20know%20more%20about%20your%20collections."
      target="_blank"
      rel="noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-lg cursor-pointer flex items-center justify-center hover:shadow-xl transition-shadow"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp size={32} />
    </motion.a>
  );
};

export default FloatingWhatsApp;
