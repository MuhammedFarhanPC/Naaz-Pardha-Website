import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        data.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        setGalleryImages(data.map(item => item.image));
      } catch (error) {
        console.error("Error fetching gallery: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  return (
    <section id="gallery" className="py-24 px-4 sm:px-6 lg:px-8 bg-brand-pastel dark:bg-brand-black/95 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-sm font-medium tracking-[0.2em] text-brand-gold uppercase mb-3"
          >
            Lookbook
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl font-serif text-brand-black dark:text-brand-beige"
          >
            Our Gallery
          </motion.h3>
          <div className="h-1 w-20 bg-brand-gold mx-auto mt-6"></div>
        </div>

        {loading ? (
             <div className="flex justify-center py-20"><div className="w-10 h-10 border-4 border-brand-gold border-t-transparent rounded-full animate-spin"></div></div>
          ) : galleryImages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 px-4 bg-brand-pastel dark:bg-brand-black/50 rounded-lg border border-dashed border-gray-300 dark:border-gray-700">
               <p className="text-xl font-serif text-brand-black dark:text-brand-beige mb-2">No gallery images available.</p>
               <p className="text-sm text-gray-500">The gallery will be updated soon.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
                viewport={{ once: true }}
                className="relative aspect-[3/4] overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(src)}
              >
                <img 
                  src={src} 
                  alt={`Gallery image ${index + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-90 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-300 flex items-center justify-center">
                   <span className="text-white opacity-0 group-hover:opacity-100 font-medium tracking-wider uppercase transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                     View Project
                   </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          >
            <button 
              className="absolute top-6 right-6 text-white hover:text-brand-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage}
              alt="Enlarged gallery view"
              className="max-h-[90vh] max-w-[90vw] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;
