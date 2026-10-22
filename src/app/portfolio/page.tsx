'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const categories = [
  { id: 'all', label: 'Барчаси' },
  { id: 'portrait', label: 'Портрет' },
  { id: 'event', label: 'Тадбирлар' },
  { id: 'tv', label: 'ТВ ва Радио' },
  { id: 'lifestyle', label: 'Лайфстайл' },
];

const photos = [
  { id: 1, src: '/images/hero.jpg', category: 'tv', title: 'Радио студияси' },
  { id: 2, src: '/images/about.jpg', category: 'portrait', title: 'Портрет' },
  { id: 3, src: '/images/video1.jpg', category: 'tv', title: 'Радио эфир' },
  { id: 4, src: '/images/video2.jpg', category: 'lifestyle', title: 'Кафеда' },
  { id: 5, src: '/images/video3.jpg', category: 'tv', title: 'Телекўрсатув' },
  { id: 6, src: '/images/blog1.jpg', category: 'lifestyle', title: 'Ёз куни' },
  { id: 7, src: '/images/blog2.jpg', category: 'lifestyle', title: 'Табиат' },
  { id: 8, src: '/images/blog3.jpg', category: 'portrait', title: 'Табассум' },
  { id: 9, src: '/images/1723772209682.jpg', category: 'event', title: 'Қизил гилам' },
  { id: 10, src: '/images/1723772210015.jpg', category: 'event', title: 'Тўй маросими' },
  { id: 11, src: '/images/1723772211100.jpg', category: 'portrait', title: 'Миллий услуб' },
  { id: 12, src: '/images/1723772208862.jpg', category: 'portrait', title: 'Кафеда' },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);

  const filteredPhotos = activeCategory === 'all'
    ? photos
    : photos.filter(p => p.category === activeCategory);

  const currentIndex = selectedPhoto ? filteredPhotos.findIndex(p => p.id === selectedPhoto.id) : -1;

  const goToPrev = () => {
    if (currentIndex > 0) {
      setSelectedPhoto(filteredPhotos[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (currentIndex < filteredPhotos.length - 1) {
      setSelectedPhoto(filteredPhotos[currentIndex + 1]);
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-pink-50 via-white to-purple-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Портфолио
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Менинг энг яхши расмларим ва лаҳзаларим
          </motion.p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredPhotos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ delay: index * 0.05 }}
                  className="relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    className="object-cover object-[center_25%] group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white translate-y-full group-hover:translate-y-0 transition-transform">
                    <p className="font-semibold">{photo.title}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPhoto(null)}
          >
            <button
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
              onClick={() => setSelectedPhoto(null)}
            >
              <FiX size={28} />
            </button>

            {currentIndex > 0 && (
              <button
                className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              >
                <FiChevronLeft size={32} />
              </button>
            )}

            {currentIndex < filteredPhotos.length - 1 && (
              <button
                className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
              >
                <FiChevronRight size={32} />
              </button>
            )}

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                fill
                className="object-contain"
              />
            </motion.div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white text-lg font-semibold">{selectedPhoto.title}</p>
              <p className="text-white/60 text-sm mt-1">
                {currentIndex + 1} / {filteredPhotos.length}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
