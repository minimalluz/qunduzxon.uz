'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { FiHeart, FiX, FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi';

// Расмлар - кейин қўшилади
const photos = [
  { id: 1, src: '/images/onam/1.jpg', caption: '' },
  { id: 2, src: '/images/onam/2.jpg', caption: '' },
  { id: 3, src: '/images/onam/3.jpg', caption: '' },
  { id: 4, src: '/images/onam/4.jpg', caption: '' },
  { id: 5, src: '/images/onam/5.jpg', caption: '' },
  { id: 6, src: '/images/onam/6.jpg', caption: '' },
];

// Видеолар - кейин қўшилади
const videos = [
  { id: 1, src: '/videos/onam/1.mp4', title: '' },
  { id: 2, src: '/videos/onam/2.mp4', title: '' },
];

export default function OnamPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<typeof videos[0] | null>(null);

  const currentPhotoIndex = selectedPhoto ? photos.findIndex(p => p.id === selectedPhoto.id) : -1;

  const goToPrevPhoto = () => {
    if (currentPhotoIndex > 0) setSelectedPhoto(photos[currentPhotoIndex - 1]);
  };

  const goToNextPhoto = () => {
    if (currentPhotoIndex < photos.length - 1) setSelectedPhoto(photos[currentPhotoIndex + 1]);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-200 rounded-full opacity-30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-200 rounded-full opacity-30 blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center"
            >
              <FiHeart className="text-white text-3xl" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Менинг{' '}
              <span className="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                Онам
              </span>
            </h1>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8">
              Ҳаётимдаги энг қимматли инсон, менга ҳаёт берган, тарбиялаган ва
              доимо қўллаб-қувватлаган меҳрибон онажоним ҳақида.
            </p>

            <div className="flex justify-center gap-4">
              <div className="text-center px-6 py-3 bg-white rounded-2xl shadow-lg">
                <FiHeart className="text-pink-500 text-2xl mx-auto mb-1" />
                <p className="text-sm text-gray-500">Меҳр</p>
              </div>
              <div className="text-center px-6 py-3 bg-white rounded-2xl shadow-lg">
                <span className="text-2xl">🤲</span>
                <p className="text-sm text-gray-500">Дуо</p>
              </div>
              <div className="text-center px-6 py-3 bg-white rounded-2xl shadow-lg">
                <span className="text-2xl">💐</span>
                <p className="text-sm text-gray-500">Ҳурмат</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <p className="text-2xl md:text-3xl text-gray-700 font-light italic leading-relaxed mb-6">
              "Она - бу дунёдаги энг муқаддас сўз,
              она меҳри - энг буюк неъмат."
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
          </motion.blockquote>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Онам ҳақида
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-rose-500 mx-auto rounded-full" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12"
            >
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {/* Бу ерга онангиз ҳақида матн ёзинг */}
                Менинг онам - ҳаётимдаги энг муҳим инсон. У менга фақат ҳаёт бергани эмас,
                балки ҳаётда тўғри йўлни топишга, меҳрибон ва ғамхўр бўлишга ўргатди.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Онамнинг меҳри ва қўллаб-қувватлаши туфайли мен бугунги кунда
                ўз орзуларимга эришдим. Унинг ҳар бир маслаҳати, ҳар бир дуоси
                мен учун бебаҳо.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Раҳмат, онажон! Сизни жуда яхши кўраман! ❤️
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Хотиралар галереяси
            </h2>
            <p className="text-gray-600">Онам билан энг қимматли лаҳзаларим</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-lg group bg-gradient-to-br from-pink-100 to-purple-100"
                onClick={() => setSelectedPhoto(photo)}
              >
                {/* Placeholder - расм қўшилгандан кейин Image компонентини ишлатинг */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <FiHeart className="text-pink-300 text-4xl mx-auto mb-2" />
                    <p className="text-pink-400 text-sm">Расм {photo.id}</p>
                  </div>
                </div>
                {/*
                <Image
                  src={photo.src}
                  alt={`Она билан хотира ${photo.id}`}
                  fill
                  className="object-cover object-[center_25%] group-hover:scale-110 transition-transform duration-500"
                />
                */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Видео хотиралар
            </h2>
            <p className="text-gray-600">Онам билан бирга бўлган лаҳзалар</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer shadow-xl bg-gradient-to-br from-pink-200 to-purple-200"
                onClick={() => setSelectedVideo(video)}
              >
                {/* Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                    <FiPlay className="text-pink-500 text-2xl ml-1" />
                  </div>
                </div>
                <p className="absolute bottom-4 left-4 right-4 text-center text-white font-medium">
                  Видео {video.id}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedication Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <FiHeart className="text-white/80 text-5xl mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Онажон, сизни яхши кўраман!
            </h2>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              Сиз менинг ҳаётимдаги энг катта неъматсиз.
              Аллоҳ сизга узоқ умр ва саломатлик берсин!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Photo Lightbox */}
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
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedPhoto(null)}
            >
              <FiX size={28} />
            </button>

            {currentPhotoIndex > 0 && (
              <button
                className="absolute left-4 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={(e) => { e.stopPropagation(); goToPrevPhoto(); }}
              >
                <FiChevronLeft size={32} />
              </button>
            )}

            {currentPhotoIndex < photos.length - 1 && (
              <button
                className="absolute right-4 text-white p-2 hover:bg-white/10 rounded-full"
                onClick={(e) => { e.stopPropagation(); goToNextPhoto(); }}
              >
                <FiChevronRight size={32} />
              </button>
            )}

            <div className="relative max-w-4xl max-h-[80vh] w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center">
              <p className="text-pink-500">Расм {selectedPhoto.id}</p>
              {/*
              <Image
                src={selectedPhoto.src}
                alt="Она билан хотира"
                fill
                className="object-contain"
              />
              */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setSelectedVideo(null)}
          >
            <button
              className="absolute top-4 right-4 z-10 text-white p-2 hover:bg-white/10 rounded-full"
              onClick={() => setSelectedVideo(null)}
            >
              <FiX size={28} />
            </button>

            <div
              className="relative w-full max-w-[400px] h-full max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/*
              <video
                src={selectedVideo.src}
                className="w-full h-full object-contain"
                autoPlay
                controls
                playsInline
              />
              */}
              <div className="w-full h-full bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center">
                <p className="text-pink-500">Видео {selectedVideo.id}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
