import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { fileToBase64 } from '../db';
import { db } from '../firebase';
import { collection, addDoc, deleteDoc, doc, setDoc, onSnapshot, getDocs, writeBatch } from 'firebase/firestore';
import { LogOut, Image as ImageIcon, Package, Trash2, Edit3, Plus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState('collections'); // 'collections' | 'gallery'
  const [products, setProducts] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [colForm, setColForm] = useState({ id: '', name: '', price: '', category: 'Casual', image: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  useEffect(() => {
    // Real-time listener for products
    const unsubProducts = onSnapshot(collection(db, "products"), (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      prods.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)); // Sort by newest
      setProducts(prods);
      setLoading(false);
    });

    // Real-time listener for gallery
    const unsubGallery = onSnapshot(collection(db, "gallery"), (snapshot) => {
      const gals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      gals.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      setGallery(gals);
    });

    return () => {
      unsubProducts();
      unsubGallery();
    };
  }, []);

  const resetForm = () => {
    setColForm({ id: '', name: '', price: '', category: 'Casual', image: '' });
    setIsEditing(false);
    const fileInput = document.getElementById('imageUploadInput');
    if (fileInput) fileInput.value = '';
  };

  // --- Collection Actions ---
  const handleColSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate product names
    const nameTrimmed = colForm.name.trim().toLowerCase();
    const isDuplicate = products.some(p => 
       p.id !== colForm.id && p.name.trim().toLowerCase() === nameTrimmed
    );

    if (isDuplicate) {
       showToast('Error: A product with this name already exists!');
       return;
    }

    try {
      if (isEditing) {
        await setDoc(doc(db, "products", colForm.id), {
          name: colForm.name.trim(),
          price: colForm.price,
          category: colForm.category,
          image: colForm.image,
          createdAt: colForm.createdAt || Date.now()
        });
        showToast('Product Updated Successfully');
      } else {
        await addDoc(collection(db, "products"), {
          name: colForm.name.trim(),
          price: colForm.price,
          category: colForm.category,
          image: colForm.image,
          createdAt: Date.now()
        });
        showToast('Product Added Successfully');
      }
      resetForm();
    } catch (error) {
      console.error("Error saving product: ", error);
      showToast('Error saving product');
    }
  };

  const handleEditCol = (product) => {
    setColForm({ ...product });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, "products", id));
        showToast('Product Deleted Successfully');
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleWipeCollections = async () => {
    if(window.confirm('Are you sure you want to delete all products?')) {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const batch = writeBatch(db);
        querySnapshot.forEach((document) => {
          batch.delete(document.ref);
        });
        await batch.commit();
        showToast('All Products Deleted Successfully');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleColImage = async (e) => {
    if (e.target.files && e.target.files[0]) {
      const base64 = await fileToBase64(e.target.files[0]);
      setColForm({ ...colForm, image: base64 });
    }
  };

  // --- Gallery Actions ---
  const handleGalUpload = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      showToast(`Uploading ${files.length} image(s)...`);
      
      try {
        for (let i = 0; i < files.length; i++) {
          const base64 = await fileToBase64(files[i]);
          await addDoc(collection(db, "gallery"), { 
            image: base64,
            createdAt: Date.now() + i // slight offset to maintain order
          });
        }
        showToast(`${files.length} Image(s) Uploaded Successfully`);
      } catch (err) {
        console.error(err);
      }
      
      e.target.value = ''; 
    }
  };

  const handleDeleteGal = async (id) => {
    if(window.confirm('Are you sure you want to delete this image?')) {
      try {
        await deleteDoc(doc(db, "gallery", id));
        showToast('Image Deleted Successfully');
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleWipeGallery = async () => {
    if(window.confirm('⚠️ WARNING: Are you sure you want to totally WIPE all gallery images?')) {
      try {
        const querySnapshot = await getDocs(collection(db, "gallery"));
        const batch = writeBatch(db);
        querySnapshot.forEach((document) => {
          batch.delete(document.ref);
        });
        await batch.commit();
        showToast('Gallery Wiped Successfully');
      } catch (err) {
        console.error(err);
      }
    }
  };

  // --- Nuclear Reset Action ---
  const handleNuclearWipe = async () => {
    if(window.confirm('⚠️ Are you sure? This action cannot be undone.')) {
      if(window.confirm('WARNING: This will permanently delete ALL products and ALL images. Are you absolutely certain?')) {
        await handleWipeCollections();
        await handleWipeGallery();
        localStorage.clear();
        showToast('Entire Website Data Cleared');
      }
    }
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-brand-black text-brand-gold">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-brand-black text-brand-beige flex flex-col shadow-2xl z-10">
        <div className="p-6">
          <h2 className="text-2xl font-serif font-bold tracking-widest text-brand-gold">NAAZ<span className="text-brand-beige">.</span></h2>
          <p className="text-xs text-brand-beige/50 mt-1 uppercase tracking-wider">Admin Panel</p>
        </div>
        <nav className="flex-1 mt-6 space-y-2 px-4">
          <button 
            onClick={() => setActiveTab('collections')} 
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'collections' ? 'bg-brand-gold text-brand-black font-medium' : 'hover:bg-gray-800'}`}
          >
            <Package size={20} />
            <span>Manage Products</span>
          </button>
          <button 
            onClick={() => setActiveTab('gallery')} 
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'gallery' ? 'bg-brand-gold text-brand-black font-medium' : 'hover:bg-gray-800'}`}
          >
            <ImageIcon size={20} />
            <span>Gallery</span>
          </button>
        </nav>
        <div className="p-6 mt-auto space-y-3">
          <button 
            onClick={handleNuclearWipe} 
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-900/50 border border-red-500 text-red-400 rounded-lg hover:bg-red-900 hover:text-white transition-colors text-sm"
          >
            <Trash2 size={16} />
            <span>Clear Entire Website Data</span>
          </button>
          <button 
            onClick={logout} 
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 border border-brand-gold text-brand-gold rounded-lg hover:bg-brand-gold hover:text-brand-black transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
          <a href="/" className="block text-center mt-4 text-xs text-brand-beige/50 hover:text-white transition-colors">&larr; Back to Live Site</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 lg:p-10 overflow-auto">
        {activeTab === 'collections' && (
          <div className="space-y-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <h3 className="text-xl font-serif text-brand-black mb-6">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>
               <form onSubmit={handleColSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">Product Name</label>
                      <input type="text" placeholder="e.g. Wedding Abaya" value={colForm.name} onChange={e=>setColForm({...colForm, name: e.target.value})} required className="p-3 border rounded-md focus:ring-1 focus:ring-brand-gold outline-none" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">Price (Text or Number)</label>
                      <input type="text" placeholder="e.g. 2500 or Starts at ₹ 2000" value={colForm.price} onChange={e=>setColForm({...colForm, price: e.target.value})} required className="p-3 border rounded-md focus:ring-1 focus:ring-brand-gold outline-none" />
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">Category</label>
                      <select value={colForm.category} onChange={e=>setColForm({...colForm, category: e.target.value})} className="p-3 border rounded-md focus:ring-1 focus:ring-brand-gold outline-none bg-white">
                          <option value="Casual">Casual</option>
                          <option value="Party Wear">Party Wear</option>
                          <option value="Bridal">Bridal</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-col space-y-2">
                      <label className="text-sm font-medium text-gray-700">Product Image</label>
                      <input id="imageUploadInput" type="file" accept="image/*" onChange={handleColImage} className="p-2 border rounded-md focus:ring-1 focus:ring-brand-gold outline-none bg-white" required={!isEditing} />
                    </div>
                    
                    {/* Image Preview Area */}
                    <div className="mt-2 border-2 border-dashed border-gray-200 rounded-lg h-48 flex items-center justify-center bg-gray-50 overflow-hidden">
                       {colForm.image ? (
                          <img src={colForm.image} alt="Preview" className="w-full h-full object-cover" />
                       ) : (
                          <div className="text-center p-4">
                             <ImageIcon className="mx-auto text-gray-400 mb-2" size={32} />
                             <p className="text-xs text-gray-400">Image preview will appear here</p>
                          </div>
                       )}
                    </div>
                  </div>

                  <div className="md:col-span-2 flex justify-end space-x-4">
                     {isEditing && <button type="button" onClick={resetForm} className="px-6 py-2 text-gray-500 hover:text-brand-black transition-colors">Cancel</button>}
                     <button type="submit" className="px-10 py-3 bg-brand-black text-brand-gold font-bold rounded-md hover:bg-gray-800 transition-transform active:scale-95 flex items-center space-x-2 shadow-lg">
                        <span>{isEditing ? 'Save Changes' : 'Add Product'}</span>
                     </button>
                  </div>
               </form>
             </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
               <div className="flex justify-between items-center mb-6">
                 <h3 className="text-xl font-serif text-brand-black">Current Products</h3>
                 <button onClick={handleWipeCollections} className="text-xs text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded border border-red-500 transition-colors">Delete All Products</button>
               </div>
               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b text-gray-400 text-sm uppercase tracking-wider">
                          <th className="pb-3 px-4">Image</th>
                          <th className="pb-3 px-4">Name</th>
                          <th className="pb-3 px-4">Category</th>
                          <th className="pb-3 px-4">Price</th>
                          <th className="pb-3 px-4 text-right">Actions</th>
                       </tr>
                    </thead>
                    <tbody>
                       <AnimatePresence>
                         {products.map(product => (
                            <motion.tr 
                              key={product.id} 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.3 }}
                              className="border-b last:border-0 hover:bg-gray-50"
                            >
                               <td className="py-4 px-4">
                                  {product.image ? (
                                     <img src={product.image} alt={product.name} className="w-12 h-16 object-cover rounded shadow-sm" />
                                  ) : (
                                     <div className="w-12 h-16 bg-gray-200 rounded shadow-sm flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                                  )}
                               </td>
                               <td className="py-4 px-4 font-medium text-brand-black">{product.name}</td>
                               <td className="py-4 px-4 text-gray-500">{product.category}</td>
                               <td className="py-4 px-4 text-brand-gold font-medium">{String(product.price).match(/^\d+$/) ? `₹ ${product.price}` : product.price}</td>
                               <td className="py-4 px-4 text-right space-x-2">
                                  <button onClick={() => handleEditCol(product)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-md transition-colors inline-block"><Edit3 size={18} /></button>
                                  <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors inline-block"><Trash2 size={18} /></button>
                               </td>
                            </motion.tr>
                         ))}
                       </AnimatePresence>
                       {products.length === 0 && <tr><td colSpan="5" className="text-center py-8 text-gray-400">No products found.</td></tr>}
                    </tbody>
                 </table>
               </div>
             </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="space-y-8">
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
               <div className="flex items-center space-x-4">
                 <h3 className="text-xl font-serif text-brand-black">Gallery Management</h3>
                 <button onClick={handleWipeGallery} className="text-xs text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded border border-red-500 transition-colors">Delete All Images</button>
               </div>
               <label className="cursor-pointer px-6 py-2 bg-brand-gold text-brand-black font-medium rounded-md hover:bg-[#b0922f] transition-colors flex items-center space-x-2">
                  <Plus size={18} />
                  <span>Upload Image</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalUpload} />
               </label>
             </div>
             
             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
               {gallery.map(item => (
                 <div key={item.id} className="relative group rounded-lg overflow-hidden shadow-sm aspect-[3/4]">
                   <img src={item.image} alt="Gallery" className="w-full h-full object-cover" />
                   <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center space-y-3">
                      <label className="cursor-pointer px-4 py-2 bg-brand-gold text-brand-black text-xs font-semibold rounded-md hover:bg-white transition-colors flex items-center space-x-2 shadow-lg">
                        <ImageIcon size={14} />
                        <span>Replace</span>
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                           if (e.target.files && e.target.files[0]) {
                              const base64 = await fileToBase64(e.target.files[0]);
                              await setDoc(doc(db, "gallery", item.id), { 
                                 image: base64,
                                 createdAt: item.createdAt || Date.now() 
                              });
                              showToast('Image Replaced Successfully');
                           }
                        }} />
                      </label>
                      <button onClick={() => handleDeleteGal(item.id)} className="px-4 py-2 bg-red-500 text-white text-xs font-semibold rounded-md hover:bg-red-600 transition-colors flex items-center space-x-2 shadow-lg">
                         <Trash2 size={14} />
                         <span>Delete</span>
                      </button>
                   </div>
                 </div>
               ))}
             </div>
             {gallery.length === 0 && <div className="text-center py-12 text-gray-400 bg-white rounded-xl border border-gray-100">No gallery images found. Upload one to get started.</div>}
          </div>
        )}
      </div>

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-8 right-8 font-medium px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 border z-[100] ${
              toastMessage.startsWith('Error') 
                ? 'bg-red-50 text-red-700 border-red-200' 
                : 'bg-green-50 text-green-700 border-green-200'
            }`}
          >
             <CheckCircle size={24} className={toastMessage.startsWith('Error') ? 'text-red-500 hidden' : 'text-green-500'} />
             <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
