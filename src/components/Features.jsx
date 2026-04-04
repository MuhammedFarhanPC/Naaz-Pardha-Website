import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gem, Smile, Tag } from 'lucide-react';

const features = [
  {
    icon: <Award size={32} />,
    title: 'Premium Quality',
    description: 'We source only the finest fabrics for our pardhas, ensuring durability and a luxurious feel.',
  },
  {
    icon: <Smile size={32} />,
    title: 'Comfortable Wear',
    description: 'Designed for everyday comfort, our collections allow you to move freely with grace.',
  },
  {
    icon: <Gem size={32} />,
    title: 'Stylish & Modest',
    description: 'Balancing modern trends with Islamic modesty for the perfect contemporary look.',
  },
  {
    icon: <Tag size={32} />,
    title: 'Affordable Pricing',
    description: 'Experience luxury without breaking the bank. Premium fashion accessible to everyone.',
  },
];

const Features = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-beige dark:bg-brand-black transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-[0.2em] text-brand-gold uppercase mb-3"
          >
            Why Choose Us
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-brand-black dark:text-brand-beige"
          >
            The Naaz Difference
          </motion.h3>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true, amount: 0.5 }}
              className="p-8 text-center bg-white dark:bg-gray-900 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] dark:shadow-none hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="mx-auto w-16 h-16 bg-brand-pastel dark:bg-brand-black flex items-center justify-center rounded-full text-brand-gold mb-6 relative">
                 <div className="absolute inset-0 rounded-full border border-brand-gold/30 scale-110"></div>
                 {feature.icon}
              </div>
              <h4 className="text-xl font-serif font-semibold text-brand-black dark:text-brand-beige mb-3">{feature.title}</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
