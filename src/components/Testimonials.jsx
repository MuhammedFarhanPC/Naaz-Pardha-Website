import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Aisha F.',
    text: 'I bought my bridal pardha from Naaz. The quality and the detailed embroidery is just beyond words. Everyone asked me where I got it from!',
  },
  {
    id: 2,
    name: 'Fatima R.',
    text: 'The most comfortable everyday abayas I own. Truly elegant designs and the fabric is premium. Highly recommend stopping by their store in Ramanattukara.',
  },
  {
    id: 3,
    name: 'Sarah M.',
    text: 'Beautiful collection! The colors are exactly what I was looking for. Perfect blend of modern style and modesty.',
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-black dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm font-medium tracking-[0.2em] text-brand-gold uppercase mb-3"
        >
          Testimonials
        </motion.h2>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-5xl font-serif text-brand-beige mb-16"
        >
          What Our Clients Say
        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.4 }}
              className="bg-zinc-900 border border-brand-gold/20 p-8 rounded-xl relative group hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="flex justify-center mb-6 space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                   <Star key={star} size={20} className="text-brand-gold fill-brand-gold" />
                ))}
              </div>
              <p className="text-brand-beige/80 italic mb-6 leading-relaxed relative z-10">"{t.text}"</p>
              <h5 className="font-serif text-brand-gold text-lg">{t.name}</h5>
              
              <div className="absolute top-4 left-4 text-7xl text-brand-gold/5 font-serif leading-none group-hover:scale-110 transition-transform">"</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
