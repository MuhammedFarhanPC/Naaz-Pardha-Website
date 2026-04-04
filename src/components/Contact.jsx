import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const handleWhatsAppSubmit = (e) => {
    e.preventDefault();
    const { name, phone, message } = formData;
    
    // Format message for WhatsApp
    const formattedMessage = `Hello Naaz Pardha! I am reaching out from your website.%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Message:* ${message}`;
    const whatsappUrl = `https://wa.me/919809758012?text=${formattedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Clear the form
    setFormData({ name: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-beige dark:bg-brand-black transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-medium tracking-[0.2em] text-brand-gold uppercase mb-3">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-serif text-brand-black dark:text-brand-beige mb-6">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-10 leading-relaxed">
              We'd love to hear from you. Visit our boutique in Ramanattukara or reach out via phone or email for any inquiries about our collections.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-brand-pastel dark:bg-gray-900 p-3 rounded-full text-brand-gold">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-brand-black dark:text-brand-beige">Address</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Naaz Pardha & Ladies Garments,<br/>
                    Rose Complex, Opposite Kandai Petrol Pump,<br/>
                    Ramanattukara, Kerala 673633
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-brand-pastel dark:bg-gray-900 p-3 rounded-full text-brand-gold">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-brand-black dark:text-brand-beige">Phone</h4>
                  <a href="tel:9809758012" className="text-gray-600 dark:text-gray-400 mt-1 hover:text-brand-gold transition-colors inline-block">+91 98097 58012</a>
                </div>
              </div>

               <div className="flex items-start space-x-4">
                <div className="bg-brand-pastel dark:bg-gray-900 p-3 rounded-full text-brand-gold">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-medium text-brand-black dark:text-brand-beige">Hours</h4>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Mon - Sat: 9:30 AM - 8:30 PM<br/>Sun: Closed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form & Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col space-y-8"
          >
            <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <form className="space-y-4" onSubmit={handleWhatsAppSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brand-black dark:text-gray-300 mb-1">Name</label>
                  <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-md bg-brand-pastel/50 dark:bg-brand-black border border-gray-200 dark:border-gray-700 outline-none focus:border-brand-gold dark:focus:border-brand-gold transition-colors dark:text-brand-beige" placeholder="Your name"/>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-brand-black dark:text-gray-300 mb-1">Phone</label>
                  <input type="tel" id="phone" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-md bg-brand-pastel/50 dark:bg-brand-black border border-gray-200 dark:border-gray-700 outline-none focus:border-brand-gold dark:focus:border-brand-gold transition-colors dark:text-brand-beige" placeholder="Your phone number"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-brand-black dark:text-gray-300 mb-1">Message</label>
                  <textarea id="message" rows="4" required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full px-4 py-3 rounded-md bg-brand-pastel/50 dark:bg-brand-black border border-gray-200 dark:border-gray-700 outline-none focus:border-brand-gold dark:focus:border-brand-gold transition-colors dark:text-brand-beige resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full bg-brand-gold text-brand-black py-4 rounded-md font-medium hover:bg-[#b0922f] transition-colors uppercase tracking-wide">
                  Send to WhatsApp
                </button>
              </form>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8953931665416!2d75.85799437504443!3d11.177540088998188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba651f61d85c0ff%3A0xb6487a7814612f2d!2sNaaz%20Pardha%20%26%20ladies%20garments%20ramanattukara!5e0!3m2!1sen!2sin!4v1712068364024!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Naaz Pardha Location"
              ></iframe>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
