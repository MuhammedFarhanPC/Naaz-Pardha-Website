import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setCollections(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <section id="collection" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-pastel dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-[0.2em] text-brand-gold uppercase mb-3"
          >
            Discover
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-brand-black dark:text-brand-beige"
          >
            Our Collections
          </motion.h3>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-6"></div>
        </div>

        {loading ? (
           <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div></div>
        ) : collections.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-24 px-4 bg-white dark:bg-brand-black rounded-lg shadow-sm border border-dashed border-brand-gold/50">
               <p className="text-2xl font-serif text-brand-black dark:text-brand-beige mb-4">No products available</p>
               <a href="/admin/dashboard" className="px-6 py-3 bg-brand-gold text-brand-black font-semibold tracking-wider uppercase text-sm rounded-sm hover:bg-[#b0922f] transition-colors shadow-md">
                   Add Products from Admin Panel
               </a>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {collections.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                className="group cursor-pointer bg-brand-beige dark:bg-brand-black rounded-lg overflow-hidden shadow-sm hover:shadow-2xl transition-shadow duration-500 flex flex-col h-full"
              >
                <div className="relative h-[450px] overflow-hidden flex-shrink-0">
                  {item.image ? (
                     <motion.img 
                       src={item.image} 
                       alt={item.name} 
                       className="w-full h-full object-cover"
                       animate={{ scale: [1, 1.05, 1] }}
                       transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                     />
                  ) : (
                     <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-400 font-medium tracking-wide text-sm">No Image</div>
                  )}
                  <div className="absolute inset-0 bg-brand-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  <div className="absolute bottom-4 right-4 bg-brand-gold text-brand-black font-semibold px-4 py-2 rounded-sm text-sm shadow-md">
                    {String(item.price).match(/^\d+$/) ? `₹ ${item.price}` : item.price}
                  </div>
                </div>
                <div className="p-8 text-center border-t border-brand-gold/20 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-2xl font-serif text-brand-black dark:text-brand-beige mb-3">{item.name}</h4>
                    <p className="text-gray-600 dark:text-gray-400">{item.category}</p>
                  </div>
                  <div>
                    <button className="mt-6 text-brand-gold uppercase tracking-widest text-sm font-bold border-b border-transparent hover:border-brand-gold pb-1 transition-all">
                      View Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Collection;
