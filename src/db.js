import localforage from 'localforage';

// Configure async, memory-safe IndexedDB stores instead of crash-prone localStorage
export const collectionsDB = localforage.createInstance({
  name: "NaazPardhaDB",
  storeName: "collections"
});

export const galleryDB = localforage.createInstance({
  name: "NaazPardhaDB",
  storeName: "gallery"
});

export const initDB = async () => {
    // Check if the initial setup has already been done to prevent wiping real data
    if (localStorage.getItem('naaz_storage_ready') !== 'true') {
        await collectionsDB.clear();
        await galleryDB.clear();
        localStorage.setItem('naaz_storage_ready', 'true');
        new BroadcastChannel('naaz_sync').postMessage('sync');
    }
};

// Utilities to work with Base64 Images
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
};
