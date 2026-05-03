import React from 'react';
import { motion } from 'framer-motion';

const SEOContent = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-brand-black transition-colors">
      <div className="max-w-4xl mx-auto prose dark:prose-invert">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-serif text-brand-black dark:text-brand-gold mb-8">Premium Pardha Collections in Kerala</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Welcome to Naaz Pardha & Ladies Garments, your premier destination for high-quality, elegant, and modest fashion in Kerala. Located in the heart of Ramanattukara, our boutique is dedicated to providing women with a diverse range of premium pardhas and abayas that blend traditional values with contemporary style. Our collection is meticulously curated to ensure that every piece reflects sophistication and grace, making us one of the most trusted names for pardha shopping in the region.
          </p>

          <h3 className="text-2xl font-serif text-brand-black dark:text-brand-beige mb-4">Exquisite Bridal Pardha Collections</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            For your most special day, Naaz Pardha offers an exclusive range of bridal pardhas and wedding abayas. We understand that every bride wants to look her best while maintaining modesty, which is why our bridal collection features intricate embroidery, premium stonework, and luxurious fabrics like Nida, Lex and high-quality velvet. Each bridal piece is designed to be a masterpiece, ensuring you feel like royalty on your wedding day. Whether you prefer a classic black bridal pardha with subtle detailing or a more ornate design with gold accents, our Ramanattukara showroom has something to suit your unique taste.
          </p>

          <h3 className="text-2xl font-serif text-brand-black dark:text-brand-beige mb-4">Stylish Casual Wear and Everyday Abayas</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Elegance shouldn't be reserved just for special occasions. At Naaz Pardha, we believe in making every day special with our stylish casual wear collection. Our everyday abayas are designed with comfort and durability in mind, perfect for work, college, or daily errands. Using breathable fabrics that are ideal for the Kerala climate, our casual pardhas come in various cuts and colors, from minimalist solid tones to modern patterns. Experience the perfect balance of comfort and modesty with our everyday collections that allow you to move with confidence and ease.
          </p>

          <h3 className="text-2xl font-serif text-brand-black dark:text-brand-beige mb-4">Your Trusted Boutique in Ramanattukara</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Since our inception, Naaz Pardha & Ladies Garments has been committed to excellence. Our Ramanattukara boutique has become a landmark for those seeking authentic and premium modest fashion. We take pride in our personalized customer service, helping each woman find the perfect fit and style that complements her personality. Our expertise in fabrics and tailoring ensures that every garment you purchase from us meets the highest standards of quality.
          </p>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            We source our fabrics from the best manufacturers, ensuring that our pardhas are not only beautiful but also long-lasting. From the latest trends in Dubai abayas to traditional Kerala pardha styles, our inventory is constantly updated to bring you the best of the world of modest fashion. Visit us today at Ramanattukara and discover why we are the preferred choice for bridal pardha, party wear, and casual modest garments in Kerala.
          </p>

          <h3 className="text-2xl font-serif text-brand-black dark:text-brand-beige mb-4">Why Modest Fashion Matters</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Modesty is more than just a dress code; it's a statement of identity and empowerment. At Naaz Pardha, we celebrate the beauty of modesty by offering designs that are both fashion-forward and respectful of cultural values. Our collections prove that you don't have to compromise on style to maintain your principles. With a focus on fine craftsmanship and attention to detail, we help you express your individuality through elegant pardhas that stand the test of time.
          </p>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6 text-sm italic">
            Keywords: pardha shop Kerala, abaya shop Ramanattukara, ladies garments Kerala, bridal pardha, premium abaya collection, modest fashion Kerala, Naaz Pardha Ramanattukara.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default SEOContent;
